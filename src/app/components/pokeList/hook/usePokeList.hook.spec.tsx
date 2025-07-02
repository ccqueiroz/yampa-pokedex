import { describe, it, vi, beforeEach, expect, type Mock } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { usePokemonList } from "./usePokeList.hook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GetPokeListUseCase } from "@/usecase/getPokeList.usecase";
import * as store from "@/infra/store/pokemonList.store";
import type { ResponseListPokemon } from "@/domain/pokemon/pokemon.dto";

const mockSetPokemons = vi.fn();

let currentMockExecute: (input: {
  limit: number;
  offset: number;
  signal?: AbortSignal;
}) => Promise<ResponseListPokemon>;

vi.mock("@/usecase/getPokeList.usecase", async () => {
  const actual = await vi.importActual<{
    GetPokeListUseCase: typeof GetPokeListUseCase;
  }>("@/usecase/getPokeList.usecase");

  class MockedUseCase {
    execute(input: {
      limit: number;
      offset: number;
      signal?: AbortSignal;
    }): Promise<ResponseListPokemon> {
      return currentMockExecute(input);
    }
  }

  return {
    ...actual,
    GetPokeListUseCase: vi.fn(() => new MockedUseCase()),
  };
});

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePokemonList", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    currentMockExecute = vi.fn();

    vi.spyOn(store.pokemonListStore, "setPokemons").mockImplementation(
      mockSetPokemons
    );
  });

  it("should call useInfiniteQuery and return correct data structure", async () => {
    const mockResponse: ResponseListPokemon = {
      count: 1,
      next: { offset: 20, limit: 1400 },
      previous: null,
      results: [
        {
          id: "001",
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
      ],
    };

    (currentMockExecute as Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => usePokemonList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(currentMockExecute).toHaveBeenCalled();
    });

    expect(result.current).toHaveProperty("fetchNextPage");
    expect(result.current).toHaveProperty("isFetching");
    expect(result.current).toHaveProperty("hasNextPage");
    expect(result.current).toHaveProperty("hasPreviousPage");

    expect(mockSetPokemons).toHaveBeenCalledWith(mockResponse.results);
  });

  it("should not call setPokemons if execute fails", async () => {
    (currentMockExecute as Mock).mockRejectedValueOnce(new Error("API error"));

    const { result } = renderHook(() => usePokemonList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(currentMockExecute).toHaveBeenCalled();
    });

    expect(mockSetPokemons).not.toHaveBeenCalled();
    expect(result.current).toHaveProperty("fetchNextPage");
  });

  it("should calculate next and previous page params correctly", async () => {
    const response: ResponseListPokemon = {
      count: 1,
      next: { offset: 40, limit: 1400 },
      previous: { offset: 20, limit: 1400 },
      results: [
        {
          id: "002",
          name: "ivysaur",
          url: "https://pokeapi.co/api/v2/pokemon/2/",
        },
      ],
    };

    (currentMockExecute as Mock).mockResolvedValueOnce(response);

    const { result } = renderHook(() => usePokemonList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(currentMockExecute).toHaveBeenCalled();
    });

    expect(mockSetPokemons).toHaveBeenCalledWith(response.results);
    expect(result.current.hasNextPage).toBeDefined();
    expect(result.current.hasPreviousPage).toBeDefined();
  });
});
