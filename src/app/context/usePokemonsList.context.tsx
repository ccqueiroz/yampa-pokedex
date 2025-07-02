import { createContext, useContext } from "react";
import { pokemonListStore } from "@/infra/store/pokemonList.store";

export const PokemonsListContext = createContext(pokemonListStore);

export const usePokemonsList = () => useContext(PokemonsListContext);
