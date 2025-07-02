import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetPokeListService } from "./getPokeList.service";
import type { HttpGateway } from "@/domain/http/http.gateway";

describe("GetPokeListService", () => {
  const mockHttpGet = vi.fn();

  const mockHttp: HttpGateway = {
    get: mockHttpGet,
  };

  const service = new GetPokeListService(mockHttp);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call http.get with correct url and query params", async () => {
    const limit = 10;
    const offset = 20;
    const signal = new AbortController().signal;

    const mockResponse = {
      count: 100,
      next: "next-url",
      previous: "prev-url",
      results: [{ id: "1", name: "bulbasaur", url: "url" }],
    };

    mockHttpGet.mockResolvedValue(mockResponse);

    const result = await service.execute({ limit, offset, signal });

    expect(mockHttpGet).toHaveBeenCalledTimes(1);

    expect(mockHttpGet).toHaveBeenCalledWith(
      expect.stringContaining("pokemon"), // ou o caminho correto
      {
        queries: { limit, offset },
        signal,
      }
    );

    expect(result).toEqual(mockResponse);
  });

  it("should work without optional signal param", async () => {
    const limit = 5;
    const offset = 0;

    const mockResponse = {
      count: 50,
      next: null,
      previous: null,
      results: [{ id: "2", name: "ivysaur", url: "url2" }],
    };

    mockHttpGet.mockResolvedValue(mockResponse);

    const result = await service.execute({ limit, offset });

    expect(mockHttpGet).toHaveBeenCalledWith(expect.any(String), {
      queries: { limit, offset },
      signal: undefined,
    });

    expect(result).toEqual(mockResponse);
  });

  it("should propagate errors from http.get", async () => {
    const error = new Error("Network error");
    mockHttpGet.mockRejectedValue(error);

    await expect(service.execute({ limit: 1, offset: 1 })).rejects.toThrow(
      "Network error"
    );
  });
});
