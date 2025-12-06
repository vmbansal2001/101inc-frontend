import React from "react";
import {
  Wrench,
  Zap,
  CircleStop,
  Vibrate,
  PaintRoller,
  MoreHorizontal,
} from "lucide-react";
import SuspensionIcon from "@/src/assets/icons/suspension.svg";
import BrakePadIcon from "@/src/assets/icons/brake-pad.svg";

type IssueCategory = {
  label: string;
  icon: React.ReactNode;
};

const ISSUE_CATEGORIES: IssueCategory[] = [
  {
    label: "Engine Problem",
    icon: <Wrench className="w-5 h-5 text-amber-500" />,
  },
  {
    label: "Electrical Issue",
    icon: <Zap className="w-5 h-5 text-yellow-500" />,
  },
  {
    label: "Brake Issue",
    icon: <BrakePadIcon className="w-5 h-5 text-rose-500" />,
  },
  {
    label: "Suspension Problem",
    icon: <SuspensionIcon className="w-5 h-5 text-emerald-500" />,
  },
  {
    label: "Paint Job",
    icon: <PaintRoller className="w-5 h-5 text-rose-500" />,
  },
  {
    label: "Other",
    icon: <MoreHorizontal className="w-5 h-5 text-gray-500" />,
  },
];

type Props = {
  value: string[];
  onChange: (value: string) => void;
  error?: string;
};

const IssueCategorySelector: React.FC<Props> = ({ value, onChange, error }) => {
  const handleCategoryClick = (value: string) => {
    onChange(value);
  };

  return (
    <section
      aria-labelledby="issue-category-title"
      className="space-y-2"
      role="radiogroup"
    >
      <div className="">
        <h2
          id="issue-category-title"
          className="text-base font-semibold text-gray-900 tracking-tight"
        >
          Select Issues
        </h2>
        <p className="text-xs text-gray-500">
          What problems are you experiencing?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ISSUE_CATEGORIES.map((category) => {
          const isSelected = value.includes(category.label);

          const unselectedClasses =
            "border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300";

          const selectedClasses =
            "border-red-500 bg-red-50/80 shadow-[0_0_0_1px_rgba(248,113,113,0.35)]";

          return (
            <button
              key={category.label}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleCategoryClick(category.label)}
              className={`flex items-center gap-3 cursor-pointer w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 ${
                isSelected ? selectedClasses : unselectedClasses
              }`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100">
                {category.icon}
              </div>

              <span className="text-sm text-gray-900">{category.label}</span>
            </button>
          );
        })}
      </div>

      {error ? (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      ) : null}
    </section>
  );
};

export default IssueCategorySelector;
