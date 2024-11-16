import { Flex, Heading } from "@chakra-ui/react";
import { LiaClipboardListSolid } from "react-icons/lia";

export function Header() {
  return (
    <Flex as="header" gap={4} alignItems="center" mb={8}>
      <Heading>TODO LIST</Heading>
      <LiaClipboardListSolid size={22} />
    </Flex>
  );
}
