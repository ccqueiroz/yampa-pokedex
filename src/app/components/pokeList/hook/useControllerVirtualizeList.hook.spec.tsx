import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useControllerVirtualize } from "./useControllerVirtualizeList.hook";
import type { Virtualizer } from "@tanstack/react-virtual";

vi.mock("@/app/hooks/useMobile.hook", () => ({
  useIsMobile: () => false,
}));

const mockMeasure = vi.fn();

const mockVirtualizer = {
  measure: mockMeasure,
  getVirtualItems: () => [],
  getTotalSize: () => 0,
} as unknown as Virtualizer<HTMLDivElement, Element>;

vi.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: () => mockVirtualizer,
}));

const pokemonList = [
  { id: "2", name: "Ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
  { id: "3", name: "Venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
  { id: "4", name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
  { id: "5", name: "Charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" },
  { id: "6", name: "Charizard", url: "https://pokeapi.co/api/v2/pokemon/6/" },
  { id: "7", name: "Squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/" },
  { id: "8", name: "Wartortle", url: "https://pokeapi.co/api/v2/pokemon/8/" },
  { id: "9", name: "Blastoise", url: "https://pokeapi.co/api/v2/pokemon/9/" },
  { id: "10", name: "Caterpie", url: "https://pokeapi.co/api/v2/pokemon/10/" },
  { id: "11", name: "Metapod", url: "https://pokeapi.co/api/v2/pokemon/11/" },
  {
    id: "12",
    name: "Butterfree",
    url: "https://pokeapi.co/api/v2/pokemon/12/",
  },
  { id: "13", name: "Weedle", url: "https://pokeapi.co/api/v2/pokemon/13/" },
  { id: "14", name: "Kakuna", url: "https://pokeapi.co/api/v2/pokemon/14/" },
  { id: "15", name: "Beedrill", url: "https://pokeapi.co/api/v2/pokemon/15/" },
];

describe("useControllerVirtualize - basic return", () => {
  it("should return parentRef, observerRef, rowVirtualizer and setRowItems", () => {
    const { result } = renderHook(() =>
      useControllerVirtualize({
        columnsGrid: 3,
        isFetching: false,
        hasNextPage: false,
        fetchNextPage: vi.fn(),
        pokemonList,
      })
    );

    expect(result.current.parentRef).toBeDefined();
    expect(result.current.observerRef).toBeDefined();
    expect(result.current.rowVirtualizer).toEqual(mockVirtualizer);
    expect(typeof result.current.setRowItems).toBe("function");
  });
});
