import { PropsWithChildren } from "react";
import { Provider } from "@/components/provider";

export function ChakraProviderWrapper({ children }: PropsWithChildren) {
  return <Provider>{children}</Provider>;
}
