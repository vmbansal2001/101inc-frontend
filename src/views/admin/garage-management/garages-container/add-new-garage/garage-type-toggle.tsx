"use client";

import React from "react";

type GarageType = "Public" | "Private" | null;

type Props = {
  value: GarageType;
  onChange: (type: "Public" | "Private") => void;
};

const options: {
  label: string;
  value: "Public" | "Private";
  description: string;
}[] = [
  {
    label: "Public Garage",
    value: "Public",
    description:
      "Customer-facing location. Provide a garage name and operator.",
  },
  {
    label: "Independent Operator",
    value: "Private",
    description: "Operator-managed location. We will keep the naming simple.",
  },
];

const GarageTypeToggle = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-700">
        Garage type <span className="text-red-500">*</span>
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option) => {
          const isActive = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition shadow-sm ${
                isActive
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isActive ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                />
                {option.label}
              </span>
              <span className="text-xs text-gray-600">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export type { GarageType };
export default GarageTypeToggle;
