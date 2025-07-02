import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebouce.hook";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("should call callback after delay", () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useDebounce());

    act(() => {
      result.current.debounce(callback, 500);
    });

    expect(callback).not.toBeCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should reset timer if debounce is called again before delay", () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useDebounce());

    act(() => {
      result.current.debounce(callback, 500);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    act(() => {
      result.current.debounce(callback, 500);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).not.toBeCalled();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call callback if cancel is called before delay", () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useDebounce());

    act(() => {
      result.current.debounce(callback, 500);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    act(() => {
      result.current.cancel();
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).not.toBeCalled();
  });

  it("should allow multiple debounce calls with proper execution", () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useDebounce());

    act(() => {
      result.current.debounce(callback, 500);
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.debounce(callback, 500);
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
