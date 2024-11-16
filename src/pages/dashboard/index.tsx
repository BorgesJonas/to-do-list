import { Button } from "@/components/button";
import { Flex, Heading, VStack } from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { LiaClipboardListSolid } from "react-icons/lia";

import { Tooltip } from "@/components/tooltip";

export function Dashboard() {
  return (
    <Flex
      as="main"
      height="calc(100vh - 72px)"
      overflow="auto"
      alignItems="center"
      justifyContent="center"
    >
      <VStack>
        <Flex as="header" gap={4} alignItems="center" mb={8}>
          <Heading>TODO LIST</Heading>
          <LiaClipboardListSolid size={22} />
        </Flex>
        <Flex justifyContent="space-between" width="300px">
          <Tooltip content="Criar nova tarefa">
            <Button variant="subtle" aria-label="Criar nova tarefa">
              <FiPlus />
              Nova Tarefa
            </Button>
          </Tooltip>

          <Tooltip content="Filtrar">
            <Button variant="subtle" aria-label="Filtrar tarefas">
              <FaFilter size={8} />
            </Button>
          </Tooltip>
        </Flex>
      </VStack>
    </Flex>
  );
}
