import { describe, it, expect } from "vitest";
import type {
  AbilitiesBase,
  ResponsePokemonService,
  StatsBase,
  TypeBase,
} from "./pokemon.dto";
import { PokemonInfoDataEntitie } from "./pokemonInfoData.entitie";

describe("PokemonInfoDataEntitie", () => {
  const mockAbilities: AbilitiesBase[] = [
    {
      ability: { name: "overgrow", url: "some-url" },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: { name: "chlorophyll", url: "some-url" },
      is_hidden: true,
      slot: 3,
    },
  ];

  const mockStats: StatsBase[] = [
    { base_stat: 45, stat: { name: "hp" } },
    { base_stat: 49, stat: { name: "attack" } },
    { base_stat: 49, stat: { name: "defense" } },
    { base_stat: 65, stat: { name: "special-attack" } },
    { base_stat: 65, stat: { name: "special-defense" } },
    { base_stat: 45, stat: { name: "speed" } },
  ];

  const mockTypes: TypeBase[] = [
    { type: { name: "grass" } },
    { type: { name: "poison" } },
  ];

  const mockResponse: ResponsePokemonService = {
    id: 1,
    name: "bulbasaur",
    height: 7,
    weight: 69,
    base_experience: 64,
    abilities: mockAbilities,
    stats: mockStats,
    types: mockTypes,
  };

  it("should create an instance with correct properties and getters", () => {
    const pokemon = PokemonInfoDataEntitie.create(mockResponse);

    expect(pokemon).toBeInstanceOf(PokemonInfoDataEntitie);

    expect(pokemon.id).toBe(mockResponse.id);
    expect(pokemon.name).toBe(mockResponse.name);
    expect(pokemon.nameFormated).toBe("Bulbasaur");

    expect(pokemon.height).toBe(mockResponse.height);
    expect(pokemon.weight).toBe(mockResponse.weight);

    expect(pokemon.types).toEqual([{ type: "grass" }, { type: "poison" }]);

    expect(pokemon.abilities).toEqual([
      { slot: 1, ability: "Overgrow" },
      { slot: 3, ability: "Chlorophyll" },
    ]);


    expect(pokemon.statusPokemon).toEqual({
      hp: 45,
      attack: 49,
      defense: 49,
      "special-attack": 65,
      "special-defense": 65,
      speed: 45,
      total: 318,
    });
  });

  it("should capitalize first letter correctly", () => {
      const responseEmptyName: ResponsePokemonService = {
      ...mockResponse,
      name: "",
    };
    const pokemonEmptyName = PokemonInfoDataEntitie.create(responseEmptyName);
    expect(pokemonEmptyName.nameFormated).toBe("");
  });

  it("should return total 0 when no stats provided", () => {
    const responseNoStats = {
      ...mockResponse,
      stats: [],
    };
    const pokemonNoStats = PokemonInfoDataEntitie.create(responseNoStats);
    expect(pokemonNoStats.statusPokemon.total).toBe(0);

    expect(pokemonNoStats.statusPokemon).toEqual({
      hp: 0,
      attack: 0,
      defense: 0,
      "special-attack": 0,
      "special-defense": 0,
      speed: 0,
      total: 0,
    });
  });

  it("should handle unknown stats gracefully", () => {

    const responseWithUnknownStat = {
      ...mockResponse,
      stats: [...mockStats, { base_stat: 50, stat: { name: "unknown-stat" } }],
    };
    const pokemon = PokemonInfoDataEntitie.create(responseWithUnknownStat);

    expect(pokemon.statusPokemon.total).toBe(318);
  });
});
