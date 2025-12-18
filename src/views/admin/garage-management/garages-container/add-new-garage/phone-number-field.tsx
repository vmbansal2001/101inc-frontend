"use client";

import React, { useMemo } from "react";
import PhoneNumberInput, {
  Value,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "./phone-number-field.module.css";

type Props = {
  label?: string;
  value: Value | undefined;
  onChange: (value: Value | undefined) => void;
  helperText?: string;
  error?: string | null;
  disabled?: boolean;
  required?: boolean;
};

const PhoneNumberField = ({
  label = "Phone number",
  value,
  onChange,
  helperText,
  error,
  disabled,
  required,
}: Props) => {
  const isValid = useMemo(() => {
    if (!value) return false;
    try {
      return isValidPhoneNumber(value);
    } catch {
      return false;
    }
  }, [value]);

  const displayHelper =
    error ??
    helperText ??
    (value
      ? isValid
        ? "Looks good. We'll use this to find or create the operator."
        : "Enter a valid number with country code."
      : "Include country code so we can validate it.");

  const helperColor = error
    ? "text-red-600"
    : isValid
    ? "text-slate-600"
    : "text-slate-500";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-semibold text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {!error && value && (
          <span
            className={`text-xs font-semibold ${
              isValid ? "text-emerald-600" : "text-slate-500"
            }`}
          >
            {isValid ? "Valid" : "Needs country code"}
          </span>
        )}
      </div>

      <div className={styles.wrapper}>
        <PhoneNumberInput
          defaultCountry="NP"
          value={value}
          onChange={onChange}
          international
          placeholder="+1 555 555 1234"
          className="garage-phone-input"
          disabled={disabled}
          countrySelectProps={{
            className: "phone-input-select",
            "aria-label": "Country",
          }}
          numberInputProps={{
            name: "phone",
            "aria-label": "Phone number",
          }}
        />
      </div>

      <p className={`text-xs ${helperColor}`}>{displayHelper}</p>
    </div>
  );
};

export default PhoneNumberField;
