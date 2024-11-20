import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Actions } from "./components/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { customRender } from "@/tests/custom-render";

vi.mock("@auth0/auth0-react");

function renderComponent() {
  return customRender(<Actions />);
}

describe("Actions Component", () => {
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: false,
      user: {
        email: "test@example.com",
        picture: "https://example.com/avatar.jpg",
      },
      logout: mockLogout,
    } as any);
  });

  it("Should render user information when loaded", () => {
    renderComponent();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByTestId("user-avatar")).toBeInTheDocument();
  });

  it("Should render skeleton when loading", () => {
    vi.mocked(useAuth0).mockReturnValue({
      isLoading: true,
    } as any);

    renderComponent();
    expect(screen.getByTestId("user-info-loader")).toBeInTheDocument();
    expect(screen.getByTestId("user-avatar-loader")).toBeInTheDocument();
  });

  it("Should call logout function when logout button is clicked", async () => {
    renderComponent();

    const logoutButton = screen.getByRole("button", { name: "Sair" });
    await userEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledWith({
      logoutParams: { returnTo: window.location.origin },
    });
  });

  it("Should display tooltip on logout button hover", async () => {
    renderComponent();

    const logoutButton = screen.getByRole("button", { name: "Sair" });
    await userEvent.hover(logoutButton);

    expect(await screen.findByText("Sair")).toBeInTheDocument();
  });
});
