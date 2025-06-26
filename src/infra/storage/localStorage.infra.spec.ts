import { describe, it, expect, vi, beforeEach } from "vitest";
import { LocalStorageInfra } from "@/infra/storage/localStorage.infra";

describe("LocalStorageInfra", () => {
  const storage = new LocalStorageInfra();

  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("should save a string value", () => {
    storage.save("i18nextLng", "en");
    expect(localStorage.getItem("i18nextLng")).toBe("en");
  });

  it("should save an object as JSON string", () => {
    const user = { name: "Caio", age: 33 };
    storage.save("user", user);
    expect(localStorage.getItem("user")).toBe(JSON.stringify(user));
  });

  it("should recover a string", () => {
    localStorage.setItem("i18nextLng", "pt");
    const result = storage.recover<string>("i18nextLng");
    expect(result).toBe("pt");
  });

  it("should recover a JSON object", () => {
    const user = { name: "Caio", age: 33 };
    localStorage.setItem("user", JSON.stringify(user));
    const result = storage.recover<typeof user>("user");
    expect(result).toEqual(user);
  });

  it("should return null if key does not exist", () => {
    const result = storage.recover<string>("unknown");
    expect(result).toBeNull();
  });

  it("should delete a key", () => {
    localStorage.setItem("temp", "value");
    storage.delete("temp");
    expect(localStorage.getItem("temp")).toBeNull();
  });
});
