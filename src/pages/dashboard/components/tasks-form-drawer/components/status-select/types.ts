import { SelectRootProps } from "@chakra-ui/react";
import { SelectContentProps } from "@/components/select/types";

export type StatusSelectProps = Omit<SelectRootProps, "collection"> &
  SelectContentProps;
