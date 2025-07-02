/* eslint-disable @typescript-eslint/no-unused-vars */
import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "./useMobile.hook";
import { describe, expect, it, beforeEach } from "vitest";

type MatchMediaListener = (
  this: MediaQueryList,
  ev: MediaQueryListEvent
) => void;

describe("useIsMobile", () => {
  let listeners: MatchMediaListener[] = [];

  beforeEach(() => {
    let width = 800;
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      get: () => width,
      set: (val: number) => {
        width = val;
      },
    });

    listeners = [];

    window.matchMedia = (query: string): MediaQueryList => {
      return {
        media: query,
        matches: window.innerWidth < 600,
        onchange: null,
        addEventListener: (_event: "change", listener: MatchMediaListener) => {
          listeners.push(listener);
        },
        removeEventListener: (
          _event: "change",
          listener: MatchMediaListener
        ) => {
          listeners = listeners.filter((l) => l !== listener);
        },
        dispatchEvent: (_event: Event) => false,
        addListener: () => {},
        removeListener: () => {},
        readonly: false,
      } as MediaQueryList;
    };
  });

  function triggerChange() {
    const event = new Event("change") as MediaQueryListEvent;
    Object.defineProperty(event, "matches", {
      get: () => window.innerWidth < 600,
    });
    listeners.forEach((listener) =>
      listener.call(window.matchMedia(""), event)
    );
  }

  it("should return false initially when width >= 600", () => {
    window.innerWidth = 800;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("should return true initially when width < 600", () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("should update when window width changes", () => {
    window.innerWidth = 800;
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 400;
      triggerChange();
    });

    expect(result.current).toBe(true);
  });
});
