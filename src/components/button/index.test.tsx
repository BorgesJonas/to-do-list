import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { customRender } from "@/tests/custom-render";
import { Button } from "./";
import { Provider } from "../provider";
import { ButtonProps } from "./types";
import userEvent from "@testing-library/user-event";

function renderComponent(props?: ButtonProps) {
  return customRender(
    <Provider>
      <Button {...props}>Click me</Button>
    </Provider>
  );
}

describe("Button component", () => {
  it("renders children correctly", () => {
    renderComponent();
    expect(screen.getByText(/click me/i)).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const handleClick = vi.fn();
    renderComponent({ onClick: handleClick });
    await userEvent.click(screen.getByText(/click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Should be disabled isDisabled is true", () => {
    renderComponent({ isDisabled: true });
    expect(screen.getByText(/click me/i)).toBeDisabled();
  });

  it("Should show spinner when isLoading is true", async () => {
    renderComponent({ isLoading: true });
    expect(screen.getByTestId(/button-spinner/i)).toBeInTheDocument();
  });

  it("Should show loading text when provided", () => {
    renderComponent({ loadingText: "Loading", isLoading: true });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("Should be disabled when isLoading is true", () => {
    renderComponent({ isLoading: true });
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
