"use client";

import React, { useMemo, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneNumberInput, {
  Value,
  isValidPhoneNumber,
} from "react-phone-number-input";
import styles from "./phone-input.module.css";
import Button from "../../buttons/common-button";

type PhoneValue = Value | undefined;

type Props = {
  phoneNumber: PhoneValue;
  onChange: (value: PhoneValue) => void;
  onSendOtp: () => Promise<void>;
};

const PhoneInput = ({ phoneNumber, onChange, onSendOtp }: Props) => {
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const isValid = useMemo(() => {
    if (!phoneNumber) {
      return false;
    }

    try {
      return isValidPhoneNumber(phoneNumber);
    } catch {
      return false;
    }
  }, [phoneNumber]);

  const helperText = useMemo(() => {
    if (!phoneNumber) {
      return "We will text a one-time code to verify your number.";
    }

    if (!isValid) {
      return "Please enter a valid phone number including country code.";
    }

    return "Great! Tap the button below to receive your OTP.";
  }, [isValid, phoneNumber]);

  const helperColorClass = useMemo(() => {
    if (!phoneNumber) {
      return "text-slate-500";
    }

    return isValid ? "text-slate-500" : "text-red-500";
  }, [isValid, phoneNumber]);

  const handleSendOtp = async () => {
    if (!isValid) {
      return;
    }

    setIsSendingOtp(true);

    await onSendOtp();
    setIsSendingOtp(false);
  };

  return (
    <div className={`${styles.wrapper} w-full max-w-sm flex flex-col gap-6`}>
      <div className="flex flex-col gap-1 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
          welcome
        </p>
        <h2 className="text-2xl font-bold text-slate-900">
          Sign in with your phone
        </h2>
        <p className="text-sm text-slate-500">
          Enter a mobile number that can receive SMS messages.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 shadow-inner">
        <label className="text-left text-sm font-semibold text-slate-600">
          Phone number
        </label>

        <PhoneNumberInput
          defaultCountry="NP"
          value={phoneNumber}
          onChange={onChange}
          international
          placeholder="+1 (555) 555-1234"
          className="phone-input-control"
          countrySelectProps={{
            className: "phone-input-select",
            "aria-label": "Country",
          }}
          numberInputProps={{
            name: "phone",
            "aria-label": "Phone number",
          }}
        />

        <p className={`text-xs ${helperColorClass}`}>{helperText}</p>
      </div>

      <Button
        onClick={handleSendOtp}
        loading={isSendingOtp}
        loaderColor="#fff"
        disabled={!isValid}
        className="w-full rounded-2xl bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-red-500/30 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-300 disabled:shadow-none"
      >
        Send OTP
      </Button>

      <p className="text-center text-xs text-slate-500">
        By continuing you agree to receive SMS messages for verification.
      </p>
    </div>
  );
};

export default PhoneInput;
