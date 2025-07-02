import { observer } from "mobx-react-lite";
import { useInputSearch } from "../../context/InputSearch.provider";
import { SuggestionsItems } from "./fragments/SugestionsItems/sugestionsItems.component";

const PokemonSuggestions = observer(() => {
  const { openSuggestions } = useInputSearch();

  return (
    <div className="relative mt-2">
      {openSuggestions && <SuggestionsItems />}
    </div>
  );
});

export default PokemonSuggestions;
