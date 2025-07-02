import { usePokemonsList } from "@/app/context/usePokemonsList.context";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

type InputSearchContextProps = {
  openSugestions: boolean;
  setOpenSugestions: (state: boolean) => void;
  selectedSugestion: string;
  setSelectedSugestion: (state: string) => void;
  inputSearchPokemonRef: RefObject<HTMLInputElement | null>;
};

const InputSearchContext = createContext({} as InputSearchContextProps);

type InputSearchProviderProps = {
  children: React.ReactElement;
};

const InputSearchProvider = ({ children }: InputSearchProviderProps) => {
  const [openSugestions, setOpenSugestions] = useState(false);
  const [selectedSugestion, setSelectedSugestion] = useState("");
  const inputSearchPokemonRef = useRef<HTMLInputElement | null>(null);
  const selectedSugestionRef = useRef("");
  const { getOriginalListPokemons } = usePokemonsList();

  useEffect(() => {
    if (
      !selectedSugestion.length &&
      selectedSugestion !== selectedSugestionRef.current
    ) {
      getOriginalListPokemons();
    }

    selectedSugestionRef.current = selectedSugestion;
  }, [selectedSugestion, getOriginalListPokemons]);

  return (
    <InputSearchContext.Provider
      value={{
        openSugestions,
        setOpenSugestions,
        selectedSugestion,
        setSelectedSugestion,
        inputSearchPokemonRef,
      }}
    >
      {children}
    </InputSearchContext.Provider>
  );
};

function useInputSearch() {
  const context = useContext(InputSearchContext);
  if (!context) {
    throw new Error(
      "useInputSearch must be used within an InputSearchProvider."
    );
  }
  return context;
}

export { InputSearchProvider, useInputSearch };
