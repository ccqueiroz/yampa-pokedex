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
  openSuggestions: boolean;
  setOpenSuggestions: (state: boolean) => void;
  selectedSuggestion: string;
  setSelectedSuggestion: (state: string) => void;
  inputSearchPokemonRef: RefObject<HTMLInputElement | null>;
};

const InputSearchContext = createContext({} as InputSearchContextProps);

type InputSearchProviderProps = {
  children: React.ReactElement;
};

const InputSearchProvider = ({ children }: InputSearchProviderProps) => {
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const inputSearchPokemonRef = useRef<HTMLInputElement | null>(null);
  const selectedSuggestionRef = useRef("");
  const { getOriginalListPokemons } = usePokemonsList();

  useEffect(() => {
    if (
      !selectedSuggestion.length &&
      selectedSuggestion !== selectedSuggestionRef.current
    ) {
      getOriginalListPokemons();
    }

    selectedSuggestionRef.current = selectedSuggestion;
  }, [selectedSuggestion, getOriginalListPokemons]);

  return (
    <InputSearchContext.Provider
      value={{
        openSuggestions,
        setOpenSuggestions,
        selectedSuggestion,
        setSelectedSuggestion,
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
