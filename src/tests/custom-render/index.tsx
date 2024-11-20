import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProviderWrapper } from "./components/chackra-provider-wrapper";

export function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: ChakraProviderWrapper, ...options });
}
