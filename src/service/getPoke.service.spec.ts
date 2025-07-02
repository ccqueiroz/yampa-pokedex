import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetPokemonService } from "./getPoke.service";
import type { HttpGateway } from "@/domain/http/http.gateway";
import { BASE_API_PATHS } from "@/infra/constants/BASE_API_PATHS.constants";

describe("GetPokemonService", () => {
  const mockHttpGet = vi.fn();

  const mockHttp: HttpGateway = {
    get: mockHttpGet,
  };

  const service = new GetPokemonService(mockHttp);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call http.get with poke_by_id url when id is provided", async () => {
    const id = "25";
    const signal = new AbortController().signal;
    const mockResponse = {
      id: 25,
      name: "pikachu",
      abilities: [],
      base_experience: 112,
      height: 4,
      stats: [],
      types: [],
      weight: 60,
    };

    mockHttpGet.mockResolvedValue(mockResponse);

    const result = await service.execute({ id, signal });

    expect(mockHttpGet).toHaveBeenCalledWith(BASE_API_PATHS.poke_by_id, {
      params: { name: undefined, id },
      signal,
    });

    expect(result).toEqual(mockResponse);
  });

  it("should call http.get with poke_by_name url when id is not provided", async () => {
    const name = "pikachu";
    const signal = new AbortController().signal;
    const mockResponse = {
      id: 25,
      name: "pikachu",
      abilities: [],
      base_experience: 112,
      height: 4,
      stats: [],
      types: [],
      weight: 60,
    };

    mockHttpGet.mockResolvedValue(mockResponse);

    const result = await service.execute({ name, signal });

    expect(mockHttpGet).toHaveBeenCalledWith(BASE_API_PATHS.poke_by_name, {
      params: { name, id: undefined },
      signal,
    });

    expect(result).toEqual(mockResponse);
  });

  it("should return null if http.get returns null", async () => {
    mockHttpGet.mockResolvedValue(null);

    const result = await service.execute({ name: "unknown" });

    expect(result).toBeNull();
  });

  it("should propagate errors from http.get", async () => {
    const error = new Error("Network error");
    mockHttpGet.mockRejectedValue(error);

    await expect(service.execute({ name: "pikachu" })).rejects.toThrow(
      "Network error"
    );
  });
});
