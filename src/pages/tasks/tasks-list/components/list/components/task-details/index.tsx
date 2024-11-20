import { Flex, Text, Box, IconButton } from "@chakra-ui/react";
import { FiEdit, FiEye } from "react-icons/fi";

import { Tag } from "@/components/tag";

import { Tooltip } from "@/components/tooltip";
import { formatDate } from "@/common/formatters";
import { prioritiesTagsSchema, statusTagsSchema } from "./consts";
import { DeleteButton } from "./delete-button";
import { useTasksContext } from "@/pages/tasks/tasks-list/contexts/tasks-context";
import { useNavigate } from "react-router-dom";
import {
  statusLabels,
  prioritiesLabels,
} from "@/pages/tasks/components/tasks-form/consts";
import { TaskDetailsProps } from "./types";

export function TaskDetails({ task }: TaskDetailsProps) {
  const navigate = useNavigate();
  const { onEditTaskDrawerVisible } = useTasksContext();

  function handleEditTask() {
    onEditTaskDrawerVisible(task);
  }

  function handleRediretctToDetails() {
    navigate(`/tasks/${task.id}`);
  }

  return (
    <Flex
      bg="white"
      borderRadius="sm"
      color="gray.800"
      px={4}
      py={2}
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box>
        <Text fontSize="lg" fontWeight="500" mb={2}>
          {task.title}
        </Text>
        <Flex gap={2}>
          <Text fontSize="sm">{formatDate(task.due_date)}</Text>
          <Tag size="sm" colorPalette={statusTagsSchema[task.status]}>
            {statusLabels[task.status]}
          </Tag>
          <Tag size="sm" colorPalette={prioritiesTagsSchema[task.priority]}>
            {prioritiesLabels[task.priority]}
          </Tag>
        </Flex>
      </Box>
      <Flex>
        <Tooltip content="Visualizar">
          <IconButton
            variant="solid"
            aria-label="Visualizar tarefa"
            onClick={handleRediretctToDetails}
          >
            <FiEye color="tea" />
          </IconButton>
        </Tooltip>

        <Tooltip content="Editar">
          <IconButton
            variant="solid"
            aria-label="Editar tarefa"
            onClick={handleEditTask}
          >
            <FiEdit color="green" />
          </IconButton>
        </Tooltip>
        <Tooltip content="Deletar">
          <DeleteButton taskId={task.id} />
        </Tooltip>
      </Flex>
    </Flex>
  );
}
