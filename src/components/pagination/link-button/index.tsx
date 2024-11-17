import { createRecipeContext } from "@chakra-ui/react";
import { LinkButtonProps } from "./types";

const { withContext } = createRecipeContext({ key: "button" });

// Replace "a" with your framework's link component
export const LinkButton = withContext<HTMLAnchorElement, LinkButtonProps>("a");
