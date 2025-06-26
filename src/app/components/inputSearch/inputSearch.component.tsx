import { useI18n } from "@/app/hooks/usei18n.hook";
import { Input } from "../ui/input";
import { Search, SendHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { useState, type ChangeEvent } from "react";

export const InputSearch = () => {
  const { translation } = useI18n();
  const [value, setValue] = useState("");

  const handleOnChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div
      role="search"
      className="flex items-center border rounded-md px-3 bg-background border-border text-secondary"
    >
      <Search className="mr-2 h-5 w-5 text-secondary" aria-hidden="true" />
      <Input
        name="input-search"
        type="search"
        aria-label={translation("inputs.placeholder")}
        placeholder={translation("inputs.placeholder")}
        className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-secondary placeholder:text-secondary p-0"
        onChange={handleOnChange}
        value={value}
        autoComplete="off"
        spellCheck={false}
      />
      <Button
        name="btn-search"
        variant="ghost"
        size="icon"
        className="ml-2 h-6 w-6 text-secondary hover:bg-transparent"
        aria-label={translation("inputs.placeholder")}
      >
        <SendHorizontal className="h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  );
};
