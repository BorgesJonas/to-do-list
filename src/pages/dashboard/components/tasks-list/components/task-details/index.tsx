import { useState } from "react";
import { Flex, Text, Box, IconButton } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

import { Tag } from "@/components/tag";
import { TaskDetailsProps } from "./types";
import { Tooltip } from "@/components/tooltip";
import { prioritiesLabels, statusLabels } from "@/common/consts";
import { formatDate } from "@/common/formatters";
import { prioritiesTagsSchema, statusTagsSchema } from "./consts";
import { DeleteButton } from "./delete-button";

export function TaskDetails({ task }: TaskDetailsProps) {
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
          <Tag size="sm" colorPalette={statusTagsSchema[task.priority]}>
            {statusLabels[task.status]}
          </Tag>
          <Tag size="sm" colorPalette={prioritiesTagsSchema[task.priority]}>
            {prioritiesLabels[task.priority]}
          </Tag>
        </Flex>
      </Box>
      <Flex gap={2}>
        <Tooltip content="Editar">
          <IconButton variant="ghost">
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
