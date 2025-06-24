import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import type { Mock } from "vitest";
import { HttpInfra } from "./http.infra";
import { HttpError } from "../../domain/http/http.error.entitie";

describe("HttpInfra", () => {
  let http: HttpInfra;

  const baseUrl = "https://api.example.com";

  beforeEach(() => {
    http = new HttpInfra(baseUrl);

    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should build URL without params", async () => {
    const fakeResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ data: 123 }),
    };
    (globalThis.fetch as Mock).mockResolvedValue(fakeResponse);

    await http.get("/path");

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: undefined,
      })
    );
  });

  it("should build URL with query params", async () => {
    const fakeResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ data: 123 }),
    };
    (globalThis.fetch as Mock).mockResolvedValue(fakeResponse);

    const queries = { a: 1, b: "test", c: null, d: undefined };

    await http.get("/path", { queries });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path?a=1&b=test",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
  });

  it("should build URL with params", async () => {
    const fakeResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ data: 123 }),
    };
    (globalThis.fetch as Mock).mockResolvedValue(fakeResponse);

    await http.get("/path/:id", { params: { id: 2 } });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path/2",
      expect.any(Object)
    );
  });

  it("should build headers with Authorization when token exists", async () => {
    const headers = { "X-Custom": "abc" };

    const fakeResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ data: 123 }),
    };
    (globalThis.fetch as Mock).mockResolvedValue(fakeResponse);

    await http.get("/path", { headers });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.example.com/path",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "X-Custom": "abc",
        }),
      })
    );
  });

  it("should throw HttpError on non-ok response", async () => {
    const fakeResponse = {
      ok: false,
      status: 400,
      json: vi.fn().mockResolvedValue({ message: "Bad request" }),
    };
    (globalThis.fetch as Mock).mockResolvedValue(fakeResponse);

    await expect(http.get("/path")).rejects.toBeInstanceOf(HttpError);
  });

  it("should throw HttpError with null message if json parsing fails", async () => {
    const fakeResponse = {
      ok: false,
      status: 500,
      json: vi.fn().mockRejectedValue(new Error("Invalid JSON")),
    };
    (globalThis.fetch as Mock).mockResolvedValue(fakeResponse);

    await expect(http.get("/path")).rejects.toBeInstanceOf(HttpError);
  });
});
