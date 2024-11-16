import { Flex } from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

import { Button } from "@/components/button";
import { Tooltip } from "@/components/tooltip";

export function Actions() {
  return (
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
  );
}
