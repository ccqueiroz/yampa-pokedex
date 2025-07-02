import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetPokeListUseCase } from "./getPokeList.usecase";
import type { PokemonEntitie } from "@/domain/pokemon/pokemon.entitie";
import type { GetPokeListService } from "@/service/getPokeList.service";

describe("GetPokeListUseCase", () => {
  const mockCreate = vi.fn();
  const mockServiceExecute = vi.fn();

  const mockService = {
    execute: mockServiceExecute,
  } as unknown as GetPokeListService;

  const pokeEntitieMock = {
    create: mockCreate,
  } as unknown as typeof PokemonEntitie;

  const useCase = new GetPokeListUseCase({
    service: mockService,
    pokeEntitie: pokeEntitieMock,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return formatted results with parsed next and previous", async () => {
    const serviceResponse = {
      count: 10,
      next: "https://pokeapi.co/api/v2/pokemon?offset=10&limit=5",
      previous: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=5",
      results: [
        { name: "bulbasaur", url: "url-1" },
        { name: "ivysaur", url: "url-2" },
      ],
    };

    mockCreate.mockImplementation(({ name, url }) => ({
      id: `id-${name}`,
      name,
      url,
    }));

    mockServiceExecute.mockResolvedValue(serviceResponse);

    const input = { limit: 5, offset: 5 };

    const result = await useCase.execute(input);

    expect(mockServiceExecute).toHaveBeenCalledWith(input);

    expect(result.next).toEqual({ offset: 10, limit: 5 });
    expect(result.previous).toEqual({ offset: 0, limit: 5 });

    expect(result.results).toEqual([
      { id: "id-bulbasaur", name: "bulbasaur", url: "url-1" },
      { id: "id-ivysaur", name: "ivysaur", url: "url-2" },
    ]);
  });

  it("should return null for next and previous if URLs are null", async () => {
    const serviceResponse = {
      count: 2,
      next: null,
      previous: null,
      results: [{ name: "bulbasaur", url: "url-1" }],
    };

    mockCreate.mockImplementation(({ name, url }) => ({
      id: `id-${name}`,
      name,
      url,
    }));

    mockServiceExecute.mockResolvedValue(serviceResponse);

    const result = await useCase.execute({ limit: 1, offset: 0 });

    expect(result.next).toBeNull();
    expect(result.previous).toBeNull();

    expect(result.results).toHaveLength(1);
  });

  it("should return null for next and previous if URLs do not match expected pattern", async () => {
    const serviceResponse = {
      count: 1,
      next: "https://pokeapi.co/api/v2/pokemon?foo=bar",
      previous: "https://pokeapi.co/api/v2/pokemon?offset=&limit=",
      results: [{ name: "bulbasaur", url: "url-1" }],
    };

    mockCreate.mockImplementation(({ name, url }) => ({
      id: `id-${name}`,
      name,
      url,
    }));

    mockServiceExecute.mockResolvedValue(serviceResponse);

    const result = await useCase.execute({ limit: 1, offset: 0 });

    expect(result.next).toBeNull();
    expect(result.previous).toBeNull();
  });

  it("should handle empty results array", async () => {
    const serviceResponse = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    mockServiceExecute.mockResolvedValue(serviceResponse);

    const result = await useCase.execute({ limit: 5, offset: 0 });

    expect(result.results).toEqual([]);
  });
});
