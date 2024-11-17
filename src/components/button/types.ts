import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

export interface ButtonProps extends ChakraButtonProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingText?: React.ReactNode;
}
