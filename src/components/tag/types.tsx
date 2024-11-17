import { Tag as ChakraTag } from "@chakra-ui/react";

export interface TagProps extends ChakraTag.RootProps {
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  onClose?: VoidFunction;
  closable?: boolean;
}
