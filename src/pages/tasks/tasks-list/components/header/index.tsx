import { Flex, Heading } from "@chakra-ui/react";
import { LiaClipboardListSolid } from "react-icons/lia";

export function Header() {
  return (
    <Flex as="header" gap={4} alignItems="center">
      <Heading>TO DO LIST</Heading>
      <LiaClipboardListSolid size={22} />
    </Flex>
  );
}
