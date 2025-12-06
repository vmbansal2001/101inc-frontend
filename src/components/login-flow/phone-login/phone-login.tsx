"use client";

import React, { useCallback, useEffect, useState } from "react";
import type { Value } from "react-phone-number-input";
import toast from "react-hot-toast";
import OtpInput from "./otp-input";
import PhoneInput from "./phone-input";
import {
  clearActiveVerificationId,
  generateUserPhoneOtp,
  getActiveVerificationId,
  verifyUserPhoneOtp,
} from "./phone-login-utils";

const PhoneLogin = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<Value | undefined>();
  const [verificationId, setVerificationId] = useState<string | null>(
    () => getActiveVerificationId() ?? null
  );

  useEffect(() => {
    if (verificationId && !isOtpSent) {
      setIsOtpSent(true);
    }
  }, [isOtpSent, verificationId]);

  const handleSendOtp = useCallback(async () => {
    if (!phoneNumber) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const result = await generateUserPhoneOtp(phoneNumber);

    if (result.success) {
      toast.success("OTP sent successfully");
      setVerificationId(result.verificationId);
      setIsOtpSent(true);
    } else {
      toast.error(result.message);
    }
  }, [phoneNumber]);

  const handleEditPhone = useCallback(() => {
    clearActiveVerificationId();
    setVerificationId(null);
    setIsOtpSent(false);
  }, []);

  const handleSubmitOtp = useCallback(
    async (otp: string) => {
      const result = await verifyUserPhoneOtp(otp, verificationId ?? undefined);
      if (result.success) {
        toast.success("OTP verified successfully");
        clearActiveVerificationId();
        setVerificationId(null);
      } else {
        toast.error(result.message);
      }
    },
    [verificationId]
  );

  return (
    <>
      <div
        id="recaptha-div"
        aria-hidden="true"
        style={{ width: 0, height: 0, overflow: "hidden" }}
      />
      {isOtpSent ? (
        <OtpInput
          phoneNumber={phoneNumber}
          onEditPhone={handleEditPhone}
          onResendCode={handleSendOtp}
          onSubmitOtp={handleSubmitOtp}
        />
      ) : (
        <PhoneInput
          phoneNumber={phoneNumber}
          onChange={setPhoneNumber}
          onSendOtp={handleSendOtp}
        />
      )}
    </>
  );
};

export default PhoneLogin;
