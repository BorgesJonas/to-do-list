import { SelectRootProps } from "@chakra-ui/react";
import { SelectContentProps } from "@/components/select/types";

export type PrioritiesSelectProps = Omit<SelectRootProps, "collection"> &
  SelectContentProps;
