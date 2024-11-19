import { Button } from "@/components/button";
import { describe, it, expect } from "vitest";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "./index";
import { customRender } from "@/tests/custom-render";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function DemoDrawer() {
  return (
    <DrawerRoot>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent data-testid="drawer-content">
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerActionTrigger>
          <Button>Save</Button>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}

function renderComponent() {
  customRender(<DemoDrawer />);
}

describe("Drawer component", () => {
  it("Should open drawer on trigger click", async () => {
    renderComponent();

    const triggerButton = screen.getByRole("button", { name: "Open Drawer" });
    expect(triggerButton).toBeInTheDocument();
    await userEvent.click(triggerButton);
    expect(await screen.findByText("Drawer Title")).toBeVisible();
    expect(
      await screen.findByText(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      )
    ).toBeVisible();

    expect(await screen.findByRole("button", { name: "Save" })).toBeVisible();
    expect(await screen.findByRole("button", { name: "Cancel" })).toBeVisible();
  });
});
