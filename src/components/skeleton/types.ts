import type {
  SkeletonProps as ChakraSkeletonProps,
  CircleProps,
} from "@chakra-ui/react";

export interface SkeletonCircleProps extends ChakraSkeletonProps {
  size?: CircleProps["size"];
}

export interface SkeletonTextProps extends ChakraSkeletonProps {
  noOfLines?: number;
}
