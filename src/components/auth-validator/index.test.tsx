import { screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthValidator } from "./index";
import { Auth0ContextInterface, useAuth0, User } from "@auth0/auth0-react";
import { useLocation, useNavigate, Location } from "react-router-dom";
import { customRender } from "@/tests/custom-render";

vi.mock("@auth0/auth0-react");

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
    Outlet: vi.fn(() => <div data-testid="outlet" />),
  };
});

function renderComponent() {
  return customRender(<AuthValidator />);
}

describe("AuthValidator component", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useLocation).mockReturnValue({ pathname: "/test" } as any);
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
    } as Auth0ContextInterface<User>);
  });

  it("Should redirect to home when not authenticated and not loading", () => {
    renderComponent();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("Should redirect to /tasks when authenticated and on home page", () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
    } as Auth0ContextInterface<User>);
    vi.mocked(useLocation).mockReturnValue({
      pathname: "/",
    } as Location<string>);

    renderComponent();
    expect(mockNavigate).toHaveBeenCalledWith("/tasks");
  });

  it("Should stay on current page when authenticated and not on home page", () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
    } as Auth0ContextInterface<User>);
    vi.mocked(useLocation).mockReturnValue({
      pathname: "/test",
    } as Location<string>);

    renderComponent();
    expect(mockNavigate).toHaveBeenCalledWith("/test");
  });

  it("Should render loading text when isLoading is true", async () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: true,
      isAuthenticated: false,
    } as Auth0ContextInterface<User>);

    renderComponent();
    expect(await screen.findByTestId(/auth-loader/i)).toBeInTheDocument();
  });

  it("Should render Outlet when not loading and authenticated", () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
    } as Auth0ContextInterface<User>);

    renderComponent();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });
});
