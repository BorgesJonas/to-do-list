"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./components/color-mode-button";

export function Provider(props: ColorModeProviderProps) {
  console.log("DEFAULT", defaultSystem);
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
