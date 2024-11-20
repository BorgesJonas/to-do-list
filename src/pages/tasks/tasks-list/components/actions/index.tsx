import { Flex } from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

import { Button } from "@/components/button";
import { useTasksContext } from "@/pages/tasks/tasks-list/contexts/tasks-context";

export function Actions() {
  const { onCreateTaskDrawerVisible, onFilterDrawerVisible } =
    useTasksContext();

  return (
    <Flex justifyContent="space-between" width="300px">
      <Button
        aria-label="Criar nova tarefa"
        onClick={onCreateTaskDrawerVisible}
      >
        <FiPlus />
        Nova Tarefa
      </Button>

      <Button aria-label="Filtrar tarefas" onClick={onFilterDrawerVisible}>
        <FaFilter size={8} />
        Filtrar
      </Button>
    </Flex>
  );
}
