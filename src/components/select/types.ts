import { Select as ChakraSelect, CollectionItem } from "@chakra-ui/react";

export interface SelectTriggerProps extends ChakraSelect.ControlProps {
  clearable?: boolean;
}

export interface SelectContentProps extends ChakraSelect.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
}

export interface SelectValueTextProps
  extends Omit<ChakraSelect.ValueTextProps, "children"> {
  children?(items: CollectionItem[]): React.ReactNode;
}

export interface SelectItemGroupProps extends ChakraSelect.ItemGroupProps {
  label: React.ReactNode;
}
