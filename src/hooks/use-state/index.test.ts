import { act, renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useState } from ".";

describe("useState hook", () => {
  it("Should change only the necessary prop when call callback function", async () => {
    const mockState = { name: "John", lastName: "Doe" };
    const { result } = renderHook(() => useState<typeof mockState>(mockState));
    const [state, setState] = result.current;

    expect(state).toEqual(mockState);

    act(() => {
      setState({ lastName: "Garcia" });
    });

    const [updatedState] = result.current;

    expect(updatedState).toEqual({ name: "John", lastName: "Garcia" });
  });
});
