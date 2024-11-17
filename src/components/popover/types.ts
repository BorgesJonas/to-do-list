import { Popover as ChakraPopover } from "@chakra-ui/react";

export interface PopoverContentProps extends ChakraPopover.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
}
