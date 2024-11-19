import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { useGet } from "./use-get";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useGet hook", () => {
  it("Should fetch data successfully", async () => {
    const mockData = { id: 1, name: "Test" };
    server.use(
      http.get("/api/test", () => {
        return HttpResponse.json(mockData);
      })
    );

    const { result } = renderHook(() => useGet<typeof mockData>("/api/test"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it("Should handle error", async () => {
    server.use(
      http.get("/api/error", () => {
        return HttpResponse.error();
      })
    );

    const { result } = renderHook(() => useGet("/api/error"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it("Should refetch data when calling refetch", async () => {
    const mockData1 = { id: 1, name: "Test 1" };
    const mockData2 = { id: 2, name: "Test 2" };
    let requestCount = 0;

    server.use(
      http.get("/api/refetch", () => {
        requestCount++;
        return HttpResponse.json(requestCount === 1 ? mockData1 : mockData2);
      })
    );

    const { result } = renderHook(() =>
      useGet<typeof mockData1>("/api/refetch")
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData1);
    });

    await act(() => result.current.refetch());

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData2);
    });
  });
});
