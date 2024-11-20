import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { vi } from "vitest";

export const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

vi.mock("*.css", () => ({}));
vi.mock("*.scss", () => ({}));
vi.mock("*.less", () => ({}));

const originalConsoleError = console.error;

console.error = function (...data) {
  if (
    typeof data[0]?.toString === "function" &&
    data[0].toString().includes("Error: Could not parse CSS stylesheet")
  )
    return;
  originalConsoleError(...data);
};

class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window.Element.prototype, "scrollTo", {
  writable: true,
  value: vi.fn(),
});

window.ResizeObserver = ResizeObserverMock;
