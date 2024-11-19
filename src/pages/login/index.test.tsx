import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Login } from "./";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { customRender } from "@/tests/custom-render";

vi.mock("@auth0/auth0-react");
vi.mock("react-router-dom");

describe("Login Component", () => {
  const mockLoginWithRedirect = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useAuth0).mockReturnValue({
      loginWithRedirect: mockLoginWithRedirect,
      isLoading: false,
      isAuthenticated: false,
      user: undefined,
      logout: vi.fn(),
      getAccessTokenSilently: vi.fn(),
    } as any);

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("calls loginWithRedirect when login button is clicked", async () => {
    customRender(<Login />);
    const loginButton = screen.getByRole("button", {
      name: /entrar na plataforma/i,
    });

    await userEvent.click(loginButton);

    expect(mockLoginWithRedirect).toHaveBeenCalledWith({
      appState: { returnTo: "/tasks" },
    });
  });

  it("navigates to /tasks when authenticated", () => {
    vi.mocked(useAuth0).mockReturnValue({
      ...vi.mocked(useAuth0)(),
      isAuthenticated: true,
    } as any);

    customRender(<Login />);

    expect(mockNavigate).toHaveBeenCalledWith("/tasks");
  });
});
