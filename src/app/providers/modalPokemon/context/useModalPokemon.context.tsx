import { createContext, useContext } from "react";
import { modalPokemonStore } from "@/infra/store/modalPokemon.store";

export const ModalPokemonContext = createContext(modalPokemonStore);

export const useModalPokemon = () => useContext(ModalPokemonContext);
