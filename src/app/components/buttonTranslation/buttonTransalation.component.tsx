import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const styleActive =
  "ring-2 ring-white/40 hover:ring-white shadow-[0_0_10px_hsl(var(--primary))] hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.8)] transition";

const styleOutline =
  "ring-1 ring-white/80 hover:ring-white shadow-[0px_0px_10px_hsl(var(--primary)/0.6)] hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.8)] transition";

export const ButtonTransalation = () => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <Button
        className={cn(
          "h-12 rounded-s-lg rounded-e-none",
          active ? styleActive : styleOutline
        )}
        variant={active ? "secondary" : "outline"}
        onClick={() => setActive(true)}
      >
        <span>PT</span>
      </Button>
      <Button
        className={cn(
          "h-12 rounded-s-none rounded-e-lg ",
          !active ? styleActive : styleOutline
        )}
        variant={!active ? "secondary" : "outline"}
        onClick={() => setActive(false)}
      >
        <span>EN</span>
      </Button>
    </div>
  );
};
