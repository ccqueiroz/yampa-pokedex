import { renderHook } from "@testing-library/react";
import { useI18n } from "./usei18n.hook";
import { StorageKeys } from "@/domain/constants/storageKeys.constants";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: vi.fn((key: string) => key),
    i18n: {
      language: mockLanguage,
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

vi.mock("@/infra/storage/index.storage.infra", () => ({
  storageInfra: () => ({
    recover: (key: string) => {
      if (key === StorageKeys.i18nextLng) return "pt";
      return null;
    },
  }),
}));

const mockChangeLanguage = vi.fn();
let mockLanguage: string | null = null;

describe("useI18n", () => {
  afterEach(() => {
    mockLanguage = null;
    mockChangeLanguage.mockClear();
  });

  it("returns i18n language when set", () => {
    mockLanguage = "en";

    const { result } = renderHook(() => useI18n());

    expect(result.current.choosenLanguage).toBe("en");
  });

  it("returns language saved in storage when i18n.language is empty", () => {
    mockLanguage = "";

    const { result } = renderHook(() => useI18n());

    expect(result.current.choosenLanguage).toBe("pt");
  });

  it("returns functions t and changeLanguage", () => {
    mockLanguage = "pt";

    const { result } = renderHook(() => useI18n());

    expect(typeof result.current.translation).toBe("function");
    expect(result.current.changeLanguage).toBe(mockChangeLanguage);
  });
});
