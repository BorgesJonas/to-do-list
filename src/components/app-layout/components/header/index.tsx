import { Flex } from "@chakra-ui/react";
import { LiaClipboardListSolid } from "react-icons/lia";

import { Actions } from "./components/actions";

export function Header() {
  return (
    <Flex
      as="header"
      p={4}
      bg="#18181b"
      alignItems="center"
      justifyContent="space-between"
    >
      <LiaClipboardListSolid size={26} />
      <Actions />
    </Flex>
  );
}
