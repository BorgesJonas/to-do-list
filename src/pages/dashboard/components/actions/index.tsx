import { Flex } from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

import { Button } from "@/components/button";
import { Tooltip } from "@/components/tooltip";

import { ActionsProps } from "./types";

export function Actions({ onCreateNewTask }: ActionsProps) {
  return (
    <Flex justifyContent="space-between" width="300px">
      <Tooltip content="Criar nova tarefa">
        <Button aria-label="Criar nova tarefa" onClick={onCreateNewTask}>
          <FiPlus />
          Nova Tarefa
        </Button>
      </Tooltip>

      <Tooltip content="Filtrar">
        <Button aria-label="Filtrar tarefas">
          <FaFilter size={8} />
          Filtrar
        </Button>
      </Tooltip>
    </Flex>
  );
}
