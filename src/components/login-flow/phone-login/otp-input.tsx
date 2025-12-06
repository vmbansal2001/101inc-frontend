"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Button from "../../buttons/common-button";

type Props = {
  phoneNumber?: string;
  onEditPhone?: () => void;
  onResendCode?: () => Promise<void>;
  onSubmitOtp?: (otp: string) => Promise<void>;
};

const OTP_LENGTH = 6;

const RESEND_COOLDOWN_SECONDS = 30;

const OtpInput = ({
  phoneNumber,
  onEditPhone,
  onResendCode,
  onSubmitOtp,
}: Props) => {
  const [values, setValues] = useState<string[]>(
    Array.from({ length: OTP_LENGTH }, () => "")
  );
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const otpValue = useMemo(() => values.join(""), [values]);
  const isComplete = otpValue.length === OTP_LENGTH;

  const focusInput = useCallback((index: number) => {
    inputsRef.current[index]?.focus();
    inputsRef.current[index]?.select();
  }, []);

  const updateValue = useCallback(
    (index: number, char: string) => {
      setValues((prev) => {
        const clone = [...prev];
        clone[index] = char;
        return clone;
      });
    },
    [setValues]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const raw = event.target.value.replace(/\D/g, "");
      if (!raw) {
        updateValue(index, "");
        return;
      }

      const char = raw[raw.length - 1];
      updateValue(index, char);

      if (index < OTP_LENGTH - 1) {
        focusInput(index + 1);
      }
    },
    [focusInput, updateValue]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (event.key === "Backspace" && !values[index] && index > 0) {
        updateValue(index - 1, "");
        focusInput(index - 1);
      }

      if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault();
        focusInput(index - 1);
      }

      if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
        event.preventDefault();
        focusInput(index + 1);
      }
    },
    [focusInput, updateValue, values]
  );

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
      if (!pasted) {
        return;
      }

      const chars = pasted.slice(0, OTP_LENGTH).split("");
      setValues((prev) => {
        const clone = [...prev];
        chars.forEach((char, idx) => {
          clone[idx] = char;
        });
        return clone;
      });

      const nextIndex = Math.min(chars.length, OTP_LENGTH - 1);
      focusInput(nextIndex);
    },
    [focusInput]
  );

  const handleSubmit = async () => {
    if (!isComplete) {
      return;
    }
    if (!onSubmitOtp) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmitOtp(otpValue);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (!onResendCode || cooldown > 0) {
      return;
    }

    try {
      await onResendCode();
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (error) {
      console.error("Failed to resend OTP", error);
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          Enter verification
        </h2>
        <p className="text-sm text-slate-500">
          We sent a 6-digit code to{" "}
          <span className="font-semibold text-slate-700">{phoneNumber}</span>
        </p>
        {onEditPhone && (
          <button
            type="button"
            onClick={onEditPhone}
            className="text-sm font-semibold text-red-600 hover:text-red-500 underline-offset-2 hover:underline"
          >
            Wrong number?
          </button>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-center gap-3">
          {values.map((value, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(event) => handleChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onPaste={handlePaste}
              className="h-14 w-12 rounded-2xl border-2 border-slate-200 bg-slate-50 text-center text-2xl font-semibold text-slate-900 shadow-inner transition focus:border-red-500 focus:bg-white focus:shadow-lg focus:outline-none"
            />
          ))}
        </div>

        <div className="flex justify-center gap-1 text-sm text-slate-500">
          <p>Didn&apos;t receive the code?</p>
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0}
            className="font-semibold cursor-pointer text-red-600 hover:text-red-500 disabled:cursor-not-allowed disabled:text-slate-400"
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
          </button>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!isComplete}
        loading={isSubmitting}
        loaderColor="#fff"
        className="w-full rounded-2xl bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
      >
        Verify & Continue
      </Button>
    </div>
  );
};

export default OtpInput;
