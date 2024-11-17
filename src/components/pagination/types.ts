import type { ButtonProps, TextProps } from "@chakra-ui/react";
import { Pagination as ChakraPagination } from "@chakra-ui/react";

export interface ButtonVariantMap {
  current: ButtonProps["variant"];
  default: ButtonProps["variant"];
  ellipsis: ButtonProps["variant"];
}

export type PaginationVariant = "outline" | "solid" | "subtle";

export interface ButtonVariantContext {
  size: ButtonProps["size"];
  variantMap: ButtonVariantMap;
  getHref?: (page: number) => string;
}

export interface PaginationRootProps
  extends Omit<ChakraPagination.RootProps, "type"> {
  size?: ButtonProps["size"];
  variant?: PaginationVariant;
  getHref?: (page: number) => string;
}

export interface PageTextProps extends TextProps {
  format?: "short" | "compact" | "long";
}
