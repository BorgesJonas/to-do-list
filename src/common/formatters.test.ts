import { describe, it, expect } from "vitest";
import { formatDate } from "./formatters";

describe("Formatters helpers", () => {
  it("Should format date to Brazilian format", () => {
    const date = formatDate("2024-10-01");

    expect(date).toBe("01/10/2024");
  });
});
