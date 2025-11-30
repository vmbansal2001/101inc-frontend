import { useAppSelector } from "@/src/store/hooks";
import { ElementType } from "react";
import { nepaliTranslations } from "./translations.const";

type Props = {
  className?: string;
  as?: ElementType;
  text: string;
};

const Text = ({ className, as: As = "p", text }: Props) => {
  const { language } = useAppSelector((state) => state.configurations);

  const translatedText =
    language === "ne"
      ? nepaliTranslations[text as keyof typeof nepaliTranslations] || text
      : text;

  return <As className={className}>{translatedText}</As>;
};

export default Text;
