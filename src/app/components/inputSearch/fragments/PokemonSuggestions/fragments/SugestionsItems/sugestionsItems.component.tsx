import { useInputSearch } from "@/app/components/inputSearch/context/InputSearch.provider";
import { CommandItem } from "@/app/components/ui/command";
import { usePokemonsList } from "@/app/context/usePokemonsList.context";
import { observer } from "mobx-react-lite";
import { useI18n } from "@/app/hooks/usei18n.hook";
import { WrapperGroupSuggestions } from "../WrapperGroupSuggestions/wrapperGroupSuggestions.component";

export const SuggestionsItems = observer(() => {
  const { translation } = useI18n();
  const { pokemonsSearchSuggestion } = usePokemonsList();
  const { setSelectedSuggestion, setOpenSuggestions, inputSearchPokemonRef } =
    useInputSearch();

  const handleSelectSuggestion = (suggestion: string) => {
    setSelectedSuggestion(suggestion);
    setOpenSuggestions(false);
    if (inputSearchPokemonRef.current) {
      inputSearchPokemonRef.current.blur();
    }
  };

  return (
    <WrapperGroupSuggestions>
      {!pokemonsSearchSuggestion.length && (
        <CommandItem
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          className="cursor-pointer"
          role="option"
          disabled
        >
          {translation("accessibility.enter_at_least_three_char")}
        </CommandItem>
      )}
      {pokemonsSearchSuggestion.map((suggestion) => (
        <CommandItem
          role="option"
          key={`${suggestion.id}-${suggestion.name}`}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onSelect={() => handleSelectSuggestion(suggestion.name)}
          className="cursor-pointer"
        >
          {suggestion.name}
        </CommandItem>
      ))}
    </WrapperGroupSuggestions>
  );
});
