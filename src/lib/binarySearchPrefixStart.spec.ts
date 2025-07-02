import { describe, it, expect } from "vitest";
import { binarySearchPrefixStart } from "./binarySearchPrefixStart";
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

describe("binarySearchPrefixStart", () => {
  it("should return correct index for prefix that matches exactly one item", () => {
    const index = binarySearchPrefixStart(sampleList, "pik");
    expect(index).toBe(6);
  });

  it("should return first index of multiple matches", () => {
    const index = binarySearchPrefixStart(sampleList, "char");
    expect(index).toBe(3);
  });

  it("should return -1 when no match is found", () => {
    const index = binarySearchPrefixStart(sampleList, "xyz");
    expect(index).toBe(-1);
  });

  it("should handle empty list", () => {
    const index = binarySearchPrefixStart([], "bulb");
    expect(index).toBe(-1);
  });

  it("should be case insensitive", () => {
    const index = binarySearchPrefixStart(sampleList, "BUT");
    expect(index).toBe(1);
  });

  it("should return index 0 if first element matches", () => {
    const index = binarySearchPrefixStart(sampleList, "bulb");
    expect(index).toBe(0);
  });

  it("should return correct index if last element matches", () => {
    const index = binarySearchPrefixStart(sampleList, "rat");
    expect(index).toBe(8);
  });
});
