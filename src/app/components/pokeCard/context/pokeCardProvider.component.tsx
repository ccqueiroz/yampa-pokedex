import type { Pokemon, ResponsePokemon } from "@/domain/pokemon/pokemon.dto";
import { createContext, useContext } from "react";
import { usePokeCardProvider } from "./hook/usePokeCardProvider.hook";
import { PokeCardSkeleton } from "../fragments/pokeCardSkeleton.component";

type PokeCardContextProps = ResponsePokemon & {
  bgCardPoke: string;
  urlImage: string;
};

const PokeCardContext = createContext({} as PokeCardContextProps);

type PokeCardProviderProps = {
  children: React.ReactNode;
} & Pokemon;

const PokeCardProvider = ({ children, id }: PokeCardProviderProps) => {
  const { isLoading, data, bgCardPoke } = usePokeCardProvider({ id });

  const urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

  if (isLoading) return <PokeCardSkeleton urlImage={urlImage} />;

  const dataToTransfer = data ?? ({} as PokeCardContextProps);

  return (
    <PokeCardContext.Provider
      value={{ ...dataToTransfer, bgCardPoke, id: Number(id), urlImage }}
    >
      {children}
    </PokeCardContext.Provider>
  );
};

function usePokeCard() {
  const context = useContext(PokeCardContext);
  if (!context) {
    throw new Error(
      "usePokeCard must be used within an PokeCardProvider."
    );
  }
  return context;
}

export { PokeCardProvider, usePokeCard };
