import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/app/hooks/usei18n.hook";

const styleActive =
  "ring-2 ring-white/40 hover:ring-white shadow-[0_0_10px_hsl(var(--primary))] hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.8)] transition";

const styleOutline =
  "ring-1 ring-white/80 hover:ring-white shadow-[0px_0px_10px_hsl(var(--primary)/0.6)] hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.8)] transition";

export const ButtonTransalation = () => {
  const { choosenLanguage, changeLanguage } = useI18n();
  const [active, setActive] = useState(choosenLanguage === 'pt');

  const changeLanguagePt = () => {
    changeLanguage("pt");
    setActive(true);
  };

  const changeLanguageEn = () => {
    changeLanguage("en");
    setActive(false);
  };

  return (
    <div>
      <Button
        className={cn(
          "h-10 rounded-s-lg rounded-e-none",
          active ? styleActive : styleOutline
        )}
        variant={active ? "secondary" : "outline"}
        onClick={changeLanguagePt}
      >
        <span>PT</span>
      </Button>
      <Button
        className={cn(
          "h-10 rounded-s-none rounded-e-lg ",
          !active ? styleActive : styleOutline
        )}
        variant={!active ? "secondary" : "outline"}
        onClick={changeLanguageEn}
      >
        <span>EN</span>
      </Button>
    </div>
  );
};
