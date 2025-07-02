import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useControllerPositionCard } from "./useControllerPositionCard.hook";

vi.mock("@/infra/store/pokemonList.store", () => ({
  pokemonListStore: {
    pokemonListToShow: [
      { id: "2", name: "Ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
      {
        id: "3",
        name: "Venusaur",
        url: "https://pokeapi.co/api/v2/pokemon/3/",
      },
      {
        id: "4",
        name: "Charmander",
        url: "https://pokeapi.co/api/v2/pokemon/4/",
      },
      {
        id: "5",
        name: "Charmeleon",
        url: "https://pokeapi.co/api/v2/pokemon/5/",
      },
      {
        id: "6",
        name: "Charizard",
        url: "https://pokeapi.co/api/v2/pokemon/6/",
      },
      {
        id: "7",
        name: "Squirtle",
        url: "https://pokeapi.co/api/v2/pokemon/7/",
      },
      {
        id: "8",
        name: "Wartortle",
        url: "https://pokeapi.co/api/v2/pokemon/8/",
      },
      {
        id: "9",
        name: "Blastoise",
        url: "https://pokeapi.co/api/v2/pokemon/9/",
      },
      {
        id: "10",
        name: "Caterpie",
        url: "https://pokeapi.co/api/v2/pokemon/10/",
      },
      {
        id: "11",
        name: "Metapod",
        url: "https://pokeapi.co/api/v2/pokemon/11/",
      },
      {
        id: "12",
        name: "Butterfree",
        url: "https://pokeapi.co/api/v2/pokemon/12/",
      },
      {
        id: "13",
        name: "Weedle",
        url: "https://pokeapi.co/api/v2/pokemon/13/",
      },
      {
        id: "14",
        name: "Kakuna",
        url: "https://pokeapi.co/api/v2/pokemon/14/",
      },
      {
        id: "15",
        name: "Beedrill",
        url: "https://pokeapi.co/api/v2/pokemon/15/",
      },
    ],
  },
}));

describe("useControllerPositionCard", () => {
  let originalOffsetWidth: number;

  beforeEach(() => {
    vi.clearAllMocks();

    const section = document.createElement("div");
    section.id = "section-main";
    document.body.appendChild(section);

    originalOffsetWidth = 1024;
    Object.defineProperty(section, "offsetWidth", {
      get: () => originalOffsetWidth,
      configurable: true,
    });
  });

  it("should set columnsGrid = 1 when width <= 500", () => {
    originalOffsetWidth = 480;

    const { result } = renderHook(() => useControllerPositionCard(null));
    expect(result.current.columnsGrid).toBe(1);
  });

  it("should set columnsGrid = 2 when width <= 1100", () => {
    originalOffsetWidth = 900;

    const { result } = renderHook(() => useControllerPositionCard(null));
    expect(result.current.columnsGrid).toBe(2);
  });

  it("should set columnsGrid = 3 when width <= 1500", () => {
    originalOffsetWidth = 1400;

    const { result } = renderHook(() => useControllerPositionCard(null));
    expect(result.current.columnsGrid).toBe(3);
  });

  it("should set columnsGrid = floor(width / 350) when width > 1500", () => {
    originalOffsetWidth = 1750;

    const { result } = renderHook(() => useControllerPositionCard(null));
    expect(result.current.columnsGrid).toBe(Math.floor(1750 / 350));
  });

  it("should return rowStart directly when no idCard", () => {
    const { result } = renderHook(() => useControllerPositionCard(null));

    const output = result.current.controllStartPositionCard(100, 2);
    expect(output).toBe(100);
  });

  it("should return rowStart directly when columnsGrid > 1", () => {
    originalOffsetWidth = 1200;

    const { result } = renderHook(() => useControllerPositionCard(2));

    const output = result.current.controllStartPositionCard(200, 1);
    expect(output).toBe(200);
  });

  it("should add 130 to rowStart when rowIndex > rowOfCard (columnsGrid = 1)", () => {
    originalOffsetWidth = 400;

    const { result } = renderHook(() => useControllerPositionCard(2));

    const output = result.current.controllStartPositionCard(300, 2);
    expect(output).toBe(430);
  });

  it("should not add 130 if rowIndex <= rowOfCard", () => {
    originalOffsetWidth = 400;

    const { result } = renderHook(() => useControllerPositionCard(2));

    const output = result.current.controllStartPositionCard(300, 0);
    expect(output).toBe(300);
  });
});
