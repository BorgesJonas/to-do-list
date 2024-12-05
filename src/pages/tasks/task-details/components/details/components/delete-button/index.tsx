import { FiTrash2 } from "react-icons/fi";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useTaskContext } from "@/pages/tasks/task-details/contexts/task-context";
import { toaster } from "@/components/toaster/consts";
import { useState } from "@/hooks/use-state";
import { Button } from "@/components/button";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/popover";

import { DeletePopoverProps } from "./types";

export function DeleteButton({ taskId, onDeleteSuccess }: DeletePopoverProps) {
  const { onDeleteTask } = useTaskContext();
  const [state, setState] = useState({
    isLoading: false,
    isPopoverVisible: false,
  });

  const { isLoading, isPopoverVisible } = state;

  function handlePopoverVisible() {
    setState({ isPopoverVisible: !isPopoverVisible });
  }

  async function handleDelete() {
    setState({ isLoading: true });

    try {
      await onDeleteTask(taskId);
      onDeleteSuccess();
    } catch {
      toaster.create({
        title: "Erro",
        description: "Houve um erro ao tentar deletar a task",
        type: "error",
      });
    } finally {
      setState({ isLoading: false });
    }
  }

  return (
    <PopoverRoot
      open={isPopoverVisible}
      onOpenChange={(e) => setState({ isPopoverVisible: e.open })}
    >
      <PopoverTrigger asChild>
        <IconButton
          variant="ghost"
          aria-label="Deletar tarefa"
          onClick={handlePopoverVisible}
        >
          <FiTrash2 color="red" />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text mb={4}>Deseja realmente deletar tarefa?</Text>
          <Flex width="100%" justifyContent="flex-end">
            <Button
              size="xs"
              colorPalette="red"
              isLoading={isLoading}
              onClick={handleDelete}
              aria-label="Confirmar deleção"
            >
              Confirmar
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}
