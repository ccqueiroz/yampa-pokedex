import { createContext, useContext } from "react";
import { accordionStatusPokemon } from "@/infra/store/accordionStatusPokemon.store";

export const AccordionStatusPokemonContext = createContext(
  accordionStatusPokemon
);

export const useAccordionStatusPokemon = () =>
  useContext(AccordionStatusPokemonContext);
