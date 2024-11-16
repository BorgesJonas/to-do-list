import { Avatar as ChakraAvatar } from "@chakra-ui/react";
import type { GroupProps, SlotRecipeProps } from "@chakra-ui/react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export interface AvatarProps extends ChakraAvatar.RootProps {
  name?: string;
  src?: string;
  srcSet?: string;
  loading?: ImageProps["loading"];
  icon?: React.ReactElement;
  fallback?: React.ReactNode;
}

export interface AvatarFallbackProps extends ChakraAvatar.FallbackProps {
  name?: string;
  icon?: React.ReactElement;
}

export interface AvatarGroupProps
  extends GroupProps,
    SlotRecipeProps<"avatar"> {}
