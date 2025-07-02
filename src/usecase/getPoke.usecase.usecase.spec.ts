import { describe, it, expect, vi, beforeEach } from "vitest";
import type { GetPokemonService } from "@/service/getPoke.service";
import type { PokemonInfoDataEntitie } from "@/domain/pokemon/pokemonInfoData.entitie";
import { GetPokemonUseCase } from "./getPoke.usecase.usecase";
import { TYPE_COLORS } from "@/infra/constants/TYPE_COLORS.constantes";

describe("GetPokemonUseCase", () => {
  const mockExecute = vi.fn();
  const mockCreate = vi.fn();

  const mockService: GetPokemonService = {
    execute: mockExecute,
  } as unknown as GetPokemonService;

  const pokeInfoDataEntitieMock = {
    create: mockCreate,
  } as unknown as typeof PokemonInfoDataEntitie;

  const useCase = new GetPokemonUseCase({
    service: mockService,
    pokemonInfoDataEntitie: pokeInfoDataEntitieMock,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return formatted Pokemon data when service returns a pokemon", async () => {
    const mockPokeEntitieReturn = {
      id: 1,
      name: "bulbasaur",
      nameFormated: "Bulbasaur",
      abilities: [{ slot: 1, ability: "Overgrow" }],
      types: [{ type: "grass" }, { type: "poison" }],
      weight: 69,
      height: 7,
      statusPokemon: {
        hp: 45,
        attack: 49,
        defense: 49,
        "special-attack": 65,
        "special-defense": 65,
        speed: 45,
        total: 318,
      },
    };

    mockCreate.mockReturnValue(mockPokeEntitieReturn);

    mockExecute.mockResolvedValue({
      id: 1,
      name: "bulbasaur",
      abilities: [],
      stats: [],
      types: [],
      weight: 69,
      height: 7,
    });

    const input = { name: "bulbasaur" };

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: mockPokeEntitieReturn.id,
      name: mockPokeEntitieReturn.name,
      nameFormated: mockPokeEntitieReturn.nameFormated,
      abilities: mockPokeEntitieReturn.abilities,
      types: [
        { type: "grass", color: TYPE_COLORS["grass"] },
        { type: "poison", color: TYPE_COLORS["poison"] },
      ],
      weight: mockPokeEntitieReturn.weight,
      height: mockPokeEntitieReturn.height,
      statusPokemon: mockPokeEntitieReturn.statusPokemon,
    });

    expect(mockExecute).toHaveBeenCalledWith(input);
    expect(mockCreate).toHaveBeenCalled();
  });

  it("should return null if service returns null", async () => {
    mockExecute.mockResolvedValue(null);

    const result = await useCase.execute({ id: "9999" });

    expect(result).toBeNull();
    expect(mockExecute).toHaveBeenCalled();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("should format types correctly even if some types do not have colors", async () => {
    const mockPokeEntitieReturn = {
      id: 2,
      name: "mystery",
      nameFormated: "Mystery",
      abilities: [],
      types: [{ type: "unknown-type" }],
      weight: 0,
      height: 0,
      statusPokemon: {
        hp: 0,
        attack: 0,
        defense: 0,
        "special-attack": 0,
        "special-defense": 0,
        speed: 0,
        total: 0,
      },
    };

    mockCreate.mockReturnValue(mockPokeEntitieReturn);

    mockExecute.mockResolvedValue({
      id: 2,
      name: "mystery",
      abilities: [],
      stats: [],
      types: [],
      weight: 0,
      height: 0,
    });

    const result = await useCase.execute({ name: "mystery" });

    expect(result?.types).toEqual([{ type: "unknown-type", color: undefined }]);
  });
});
