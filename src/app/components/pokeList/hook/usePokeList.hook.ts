import { useAccordionStatusPokemon } from "@/app/context/useAccordionStatusPokemon.context";
import { useFetchPokeList } from "./useFetchPokeList.hook";
import { useControllerPositionCard } from "./useControllerPositionCard.hook";

export const usePokeList = () => {
  const { fetchNextPage, isFetching, hasNextPage } = useFetchPokeList();
  const { idCard } = useAccordionStatusPokemon();

  const { columnsGrid, controllStartPositionCard } =
    useControllerPositionCard(idCard);

  return {
    columnsGrid,
    controllStartPositionCard,
    fetchNextPage,
    isFetching,
    hasNextPage,
  };
};
