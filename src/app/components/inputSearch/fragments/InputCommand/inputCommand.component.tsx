import { observer } from "mobx-react-lite";
import { Search, SendHorizontal } from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";
import { useCallback } from "react";
import { useI18n } from "@/app/hooks/usei18n.hook";
import { Button } from "../../../ui/button";
import { useInputSearch } from "../../context/InputSearch.provider";
import { usePokemonsList } from "@/app/context/usePokemonsList.context";
import { useDebounce } from "@/app/hooks/useDebouce.hook";
import { cn } from "@/lib/utils";
import { useAccordionStatusPokemon } from "@/app/context/useAccordionStatusPokemon.context";

export const InputCommand = observer(() => {
  const { translation } = useI18n();
  const {
    setOpenSuggestions,
    selectedSuggestion,
    setSelectedSuggestion,
    inputSearchPokemonRef,
  } = useInputSearch();
  const { setSuggestions, getBySuggestedPokemons, clearSuggestions } =
    usePokemonsList();
  const { openAccordion } = useAccordionStatusPokemon();
  const { debounce } = useDebounce();

  const handleOnChange = useCallback(
    async (search: string) => {
      setSelectedSuggestion(search);

      if (search.length < 3) {
        clearSuggestions();
        return;
      }

      debounce(() => setSuggestions(search), 300);
    },
    [clearSuggestions, debounce, setSelectedSuggestion, setSuggestions]
  );

  const handleCloseSuggestions = useCallback(
    () => setOpenSuggestions(false),
    [setOpenSuggestions]
  );

  const handleOpenSuggestions = useCallback(
    () => setOpenSuggestions(true),
    [setOpenSuggestions]
  );

  const handleGetSuggestions = useCallback(() => {
    getBySuggestedPokemons(selectedSuggestion);
    openAccordion(null);
  }, [getBySuggestedPokemons, openAccordion, selectedSuggestion]);

  return (
    <div className="w-full flex items-center rounded-md border border-border bg-background px-2">
      <Search className="h-4 w-4 text-secondary mb-[2px]" aria-hidden="true" />
      <CommandPrimitive.Input
        ref={inputSearchPokemonRef}
        name="input-search-pokemon"
        value={selectedSuggestion}
        aria-label={translation("inputs.placeholder")}
        placeholder={translation("inputs.placeholder")}
        className={cn(
          "w-full h-9 flex-1 outline-none placeholder:text-secondary pl-2 pr-1 bg-muted text-secondary text-base transition-colors",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "md:text-sm"
        )}
        onValueChange={handleOnChange}
        onBlur={handleCloseSuggestions}
        onFocus={handleOpenSuggestions}
      />
      <Button
        name="btn-search-pokemon"
        variant="ghost"
        size="icon"
        className="h-6 w-6 text-secondary hover:bg-transparent"
        aria-label={translation("inputs.placeholder")}
        onClick={handleGetSuggestions}
        disabled={selectedSuggestion.length < 3}
      >
        <SendHorizontal className="h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  );
});
