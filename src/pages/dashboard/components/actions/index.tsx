import { Flex } from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

import { Button } from "@/components/button";
import { Tooltip } from "@/components/tooltip";

import { useTasksContext } from "../../contexts/tasks-context";

export function Actions() {
  const { onCreateTaskDrawerVisible } = useTasksContext();

  return (
    <Flex justifyContent="space-between" width="300px">
      <Tooltip content="Criar nova tarefa">
        <Button
          aria-label="Criar nova tarefa"
          onClick={onCreateTaskDrawerVisible}
        >
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
