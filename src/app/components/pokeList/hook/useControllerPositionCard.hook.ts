import { pokemonListStore } from "@/infra/store/pokemonList.store";
import { useCallback, useLayoutEffect, useState } from "react";

export const useControllerPositionCard = (idCard: number | null) => {
  const [columnsGrid, setColumnsGrid] = useState(1);

  const pokemonList = pokemonListStore.pokemonListToShow;

  useLayoutEffect(() => {
    const resize = () => {
      const width = document.getElementById("section-main")?.offsetWidth ?? 0;
      if (width <= 500) setColumnsGrid(1);
      else if (width <= 1100) setColumnsGrid(2);
      else if (width <= 1500) setColumnsGrid(3);
      else setColumnsGrid(Math.floor(width / 350));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const controllStartPositionCard = useCallback(
    (rowStart: number, rowIndex: number) => {
      if (!idCard || columnsGrid > 1) return rowStart;

      const indexOfCard = pokemonList.findIndex(
        (pokemon) => pokemon.id === idCard.toString()
      );
      const rowOfCard = Math.floor(indexOfCard / columnsGrid);

      return rowIndex > rowOfCard ? rowStart + 130 : rowStart;
    },
    [columnsGrid, idCard, pokemonList]
  );

  return { columnsGrid, controllStartPositionCard };
};
