import { lazy } from "react";
import { Command } from "../ui/command";

import { InputSearchProvider } from "./context/InputSearch.provider";
import { InputCommand } from "./fragments/InputCommand/inputCommand.component";

const PokemonSuggestions = lazy(() =>
  import("./fragments/PokemonSuggestions/pokemonSuggestions.component").then(
    (module) => ({
      default: module.default,
    })
  )
);

export const InputSearch = () => {
  return (
    <InputSearchProvider>
      <div role="search" className="w-full h-9 max-w-96 md:max-w-80">
        <Command className="overflow-visible bg-transparent">
          <InputCommand />
          <PokemonSuggestions />
        </Command>
      </div>
    </InputSearchProvider>
  );
};
