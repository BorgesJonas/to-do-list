import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useTableList } from "./";
import { server } from "@/setupTests";
import { http, HttpResponse } from "msw";
import { AxiosError } from "axios";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("useTableList", () => {
  const mockUrl = "https://api.example.com/data";
  const mockInitialParams = { filter: "test" };
  const mockResponse = {
    data: {
      data: [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
      ],
      items: 10,
    },
  };

  it("should fetch data and update state correctly", async () => {
    server.use(
      http.get(mockUrl, () => {
        return HttpResponse.json(mockResponse);
      })
    );

    const { result } = renderHook(() =>
      useTableList(mockUrl, mockInitialParams)
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual([]);

    await act(async () => {
      await vi.runAllTimersAsync();
    });
    console.log("result.current.data", JSON.stringify(result.current.data));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data.data).toEqual(mockResponse.data.data);
    expect(result.current.pagination.total).toBe(mockResponse.data.data.items);
  });

  it("should handle errors correctly", async () => {
    const mockError = new AxiosError("Request failed with status code 500");

    server.use(
      http.get(mockUrl, () => {
        throw new AxiosError("Request failed with status code 500");
      })
    );

    const { result } = renderHook(() => useTableList(mockUrl));

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual(mockError);
  });

  it("should update pagination correctly", async () => {
    server.use(
      http.get(mockUrl, () => {
        return HttpResponse.json(mockResponse);
      })
    );

    const { result } = renderHook(() => useTableList(mockUrl));

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.pagination.currentPage).toBe(2);

    act(() => {
      result.current.setPageSize(20);
    });

    expect(result.current.pagination.pageSize).toBe(20);
    expect(result.current.pagination.currentPage).toBe(1);
  });
});
