import { auth } from "@/src/firebase.config";
import type { FirebaseError } from "firebase/app";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
  type UserCredential,
} from "firebase/auth";

const RECAPTCHA_CONTAINER_ID = "recaptha-div";

type FirebaseErrorLike =
  | Pick<FirebaseError, "code" | "message">
  | Error
  | undefined;

type GenerateOtpSuccess = {
  success: true;
  verificationId: string;
};

type GenerateOtpFailure = {
  success: false;
  message: string;
  code?: string;
};

export type GenerateOtpResult = GenerateOtpSuccess | GenerateOtpFailure;

type VerifyOtpSuccess = {
  success: true;
  credential: UserCredential;
};

type VerifyOtpFailure = {
  success: false;
  message: string;
  code?: string;
};

export type VerifyOtpResult = VerifyOtpSuccess | VerifyOtpFailure;

type VerificationWindow = Window &
  typeof globalThis & {
    __phoneVerificationId?: string;
    grecaptcha?: {
      reset(widgetId?: string | number): void;
    };
  };

const isBrowser = () => typeof window !== "undefined";

const ensureBrowserEnv = () => {
  if (!isBrowser()) {
    throw new Error(
      "Phone authentication utilities require a browser environment."
    );
  }
};

const verificationStore = {
  get(): string | null {
    if (!isBrowser()) {
      return null;
    }
    const win = window as VerificationWindow;
    return win.__phoneVerificationId ?? null;
  },
  set(value: string | null) {
    if (!isBrowser()) {
      return;
    }
    const win = window as VerificationWindow;
    if (value) {
      win.__phoneVerificationId = value;
    } else {
      delete win.__phoneVerificationId;
    }
  },
};

let recaptchaVerifier: RecaptchaVerifier | null = null;
let recaptchaWidgetId: string | number | null = null;

const ensureRecaptchaContainer = () => {
  ensureBrowserEnv();
  if (!document.getElementById(RECAPTCHA_CONTAINER_ID)) {
    throw new Error(
      `ReCAPTCHA container #${RECAPTCHA_CONTAINER_ID} is missing from the DOM.`
    );
  }
};

const getRecaptchaVerifier = async (): Promise<RecaptchaVerifier> => {
  ensureRecaptchaContainer();

  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, RECAPTCHA_CONTAINER_ID, {
      size: "invisible",
    });
    recaptchaWidgetId = await recaptchaVerifier.render();
    return recaptchaVerifier;
  }

  if (recaptchaWidgetId === null) {
    recaptchaWidgetId = await recaptchaVerifier.render();
    return recaptchaVerifier;
  }

  const win = window as VerificationWindow;
  try {
    win.grecaptcha?.reset?.(recaptchaWidgetId);
    return recaptchaVerifier;
  } catch (error) {
    console.warn("Failed to reset reCAPTCHA widget", error);
  }

  await recaptchaVerifier.clear();
  recaptchaVerifier = null;
  recaptchaWidgetId = null;
  return getRecaptchaVerifier();
};

const extractErrorCode = (error: FirebaseErrorLike): string | undefined => {
  if (error && typeof error === "object" && "code" in error) {
    return (error as FirebaseError).code;
  }
  return undefined;
};

const getGenerateOtpErrorMessage = (code?: string) => {
  switch (code) {
    case "auth/invalid-phone-number":
      return "Invalid phone number. Please include the country code and try again.";
    case "auth/too-many-requests":
      return "Too many requests. Please wait a moment before trying again.";
    case "auth/missing-phone-number":
      return "Phone number is missing.";
    case "auth/quota-exceeded":
      return "SMS quota exceeded. Please try again later.";
    case "auth/invalid-app-credential":
      return "App verification failed. Refresh the page or try again in a new tab.";
    default:
      return "We couldn't send the OTP. Please refresh and try again.";
  }
};

const getVerifyOtpErrorMessage = (code?: string) => {
  switch (code) {
    case "auth/invalid-verification-code":
      return "Invalid OTP. Double-check the code and try again.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this phone number.";
    case "auth/code-expired":
      return "This OTP has expired. Request a new one.";
    case "auth/missing-verification-code":
      return "OTP is required.";
    default:
      return "We couldn't verify the OTP. Please try again.";
  }
};

export const generateUserPhoneOtp = async (
  phoneNumber: string
): Promise<GenerateOtpResult> => {
  try {
    ensureBrowserEnv();
  } catch {
    return {
      success: false,
      message: "Phone authentication is only available in the browser.",
    };
  }

  try {
    const verifier = await getRecaptchaVerifier();
    const confirmation = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      verifier
    );

    verificationStore.set(confirmation.verificationId);

    return { success: true, verificationId: confirmation.verificationId };
  } catch (error) {
    const code = extractErrorCode(error as FirebaseErrorLike);
    console.error("Request OTP", error);

    return {
      success: false,
      code,
      message: getGenerateOtpErrorMessage(code),
    };
  }
};

export const verifyUserPhoneOtp = async (
  otp: string,
  verificationId?: string
): Promise<VerifyOtpResult> => {
  try {
    ensureBrowserEnv();
  } catch {
    return {
      success: false,
      message: "Phone authentication is only available in the browser.",
    };
  }

  const idToUse = verificationId ?? verificationStore.get();

  if (!idToUse) {
    return {
      success: false,
      message: "No OTP request found. Please request a new code first.",
    };
  }

  try {
    const phoneCredential = PhoneAuthProvider.credential(idToUse, otp);
    const credential = await signInWithCredential(auth, phoneCredential);
    verificationStore.set(null);

    return { success: true, credential };
  } catch (error) {
    const code = extractErrorCode(error as FirebaseErrorLike);
    console.error("Verify OTP", error);

    return {
      success: false,
      code,
      message: getVerifyOtpErrorMessage(code),
    };
  }
};

export const getActiveVerificationId = () => verificationStore.get();

export const clearActiveVerificationId = () => {
  verificationStore.set(null);
};
