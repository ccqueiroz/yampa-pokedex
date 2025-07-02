import { describe, it, beforeEach, expect, vi } from "vitest";
import type { Pokemon } from "@/domain/pokemon/pokemon.dto";
import * as search from "@/lib/searchByPrefix";
import { PokemonListStore } from "./pokemonList.store";

describe("PokemonListStore", () => {
  let store: PokemonListStore;

  const samplePokemons: Pokemon[] = [
    { id: "001", name: "bulbasaur", url: "url-bulbasaur" },
    { id: "002", name: "butterfree", url: "url-butterfree" },
    { id: "003", name: "charmander", url: "url-charmander" },
  ];

  beforeEach(() => {
    store = new PokemonListStore();
  });

  it("should set pokemons and generate correct internal state", () => {
    store.setPokemons(samplePokemons);

    expect(store.pokemonListToShow).toEqual(samplePokemons);
    expect(store.totalPokemons).toBe(3);
    expect(store.pokemonsList.size).toBe(3);
    expect(store.pokemonsList.get("bulbasaur")).toEqual(samplePokemons[0]);
    expect(store.pokemonsSearchSuggestion).toEqual([]);
  });

  it("should sort pokemonsNames alphabetically (case-insensitive)", () => {
    store.setPokemons([
      { id: "003", name: "Charmander", url: "url-bulbasaur" },
      { id: "002", name: "butterfree", url: "url-butterfree" },
      { id: "001", name: "Bulbasaur", url: "url-charmander" },
    ]);

    const names = store["pokemonsNames"].map((p) => p.name);
    expect(names).toEqual(
      ["Bulbasaur", "butterfree", "Charmander"].sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
      )
    );
  });

  it("should set suggestions using searchByPrefix", () => {
    const spy = vi
      .spyOn(search, "searchByPrefix")
      .mockReturnValueOnce([{ id: "001", name: "bulbasaur" }]);

    store.setPokemons(samplePokemons);
    store.setSuggestions("bul");

    expect(store.pokemonsSearchSuggestion).toEqual([
      { id: "001", name: "bulbasaur" },
    ]);
    expect(spy).toHaveBeenCalledWith("bul", store["pokemonsNames"]);

    spy.mockRestore();
  });

  it("should clear suggestions", () => {
    store.pokemonsSearchSuggestion = [{ id: "001", name: "bulbasaur" }];
    store.clearSuggestions();
    expect(store.pokemonsSearchSuggestion).toEqual([]);
  });

  describe("getBySuggestedPokemons", () => {
    beforeEach(() => {
      store.setPokemons(samplePokemons);
    });

    it("should return early if suggestions string is empty", () => {
      store.pokemonListToShow = [];
      store.getBySuggestedPokemons("");
      expect(store.pokemonListToShow).toEqual([]);
    });

    it("should handle no suggestions available", () => {
      store.pokemonsSearchSuggestion = [];
      store.getBySuggestedPokemons("charmander");
      expect(store.pokemonListToShow).toEqual([]);
      expect(store.totalPokemons).toBe(0);
    });

    it("should return full data for exact match", () => {
      store.pokemonsSearchSuggestion = [{ id: "003", name: "charmander" }];
      store.getBySuggestedPokemons("charmander");

      expect(store.pokemonListToShow).toEqual([samplePokemons[2]]);
      expect(store.totalPokemons).toBe(1);
    });

    it("should return full data for partial matches", () => {
      store.pokemonsSearchSuggestion = [
        { id: "002", name: "butterfree" },
        { id: "003", name: "charmander" },
      ];

      store.getBySuggestedPokemons("not-matching");

      expect(store.pokemonListToShow).toEqual([
        samplePokemons[1],
        samplePokemons[2],
      ]);
      expect(store.totalPokemons).toBe(2);
    });
  });

  it("should get original list from pokemonsList map", () => {
    store.setPokemons(samplePokemons);
    store.pokemonListToShow = [];
    store.getOriginalListPokemons();

    expect(store.pokemonListToShow).toEqual(samplePokemons);
    expect(store.totalPokemons).toBe(3);
  });

  it("should reset the store completely", () => {
    store.setPokemons(samplePokemons);
    store.isLoading = true;

    store.reset();

    expect(store.pokemonsList.size).toBe(0);
    expect(store["pokemonsNames"]).toEqual([]);
    expect(store.totalPokemons).toBe(0);
    expect(store.isLoading).toBe(false);
  });
});
