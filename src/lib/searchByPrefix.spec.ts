import { describe, it, expect, vi } from "vitest";
import { searchByPrefix } from "./searchByPrefix";
import * as binarySearch from "./binarySearchPrefixStart";
import type { PokemonName } from "@/domain/pokemon/pokemon.dto";

const sampleList: PokemonName[] = [
  { id: "001", name: "bulbasaur" },
  { id: "002", name: "butterfree" },
  { id: "003", name: "caterpie" },
  { id: "004", name: "charmander" },
  { id: "005", name: "charmeleon" },
  { id: "006", name: "charizard" },
  { id: "007", name: "pikachu" },
  { id: "008", name: "pidgey" },
  { id: "009", name: "rattata" },
];

describe("searchByPrefix", () => {
  it("should return empty array if input is less than 3 characters", () => {
    const result = searchByPrefix("pi", sampleList);
    expect(result).toEqual([]);
  });

  it("should return empty array if no match is found", () => {
    const result = searchByPrefix("xyz", sampleList);
    expect(result).toEqual([]);
  });

  it("should return correct match when only one item matches", () => {
    const result = searchByPrefix("pik", sampleList);
    expect(result).toEqual([{ id: "007", name: "pikachu" }]);
  });

  it("should return multiple matches starting from first match", () => {
    const result = searchByPrefix("char", sampleList);
    expect(result).toEqual([
      { id: "004", name: "charmander" },
      { id: "005", name: "charmeleon" },
      { id: "006", name: "charizard" },
    ]);
  });

  it("should return empty array if binarySearch returns -1", () => {
    const mockBinarySearch = vi
      .spyOn(binarySearch, "binarySearchPrefixStart")
      .mockReturnValueOnce(-1);

    const result = searchByPrefix("zzz", sampleList);
    expect(result).toEqual([]);

    mockBinarySearch.mockRestore();
  });

  it("should handle case-insensitive prefix search", () => {
    const result = searchByPrefix("ChAr", sampleList);
    expect(result).toEqual([
      { id: "004", name: "charmander" },
      { id: "005", name: "charmeleon" },
      { id: "006", name: "charizard" },
    ]);
  });

  it("should stop collecting results after non-matching name", () => {
    const customList: PokemonName[] = [
      { id: "001", name: "aaapple" },
      { id: "002", name: "aaberry" },
      { id: "003", name: "acactus" },
    ];

    const result = searchByPrefix("aa", customList);
    expect(result).toEqual([]);
    const result2 = searchByPrefix("aaap", customList);
    expect(result2).toEqual([{ id: "001", name: "aaapple" }]);
  });
});
