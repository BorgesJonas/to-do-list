import { FiTrash2 } from "react-icons/fi";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/popover";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { Button } from "@/components/button";
import { DeletePopoverProps } from "./types";
import { useTasksContext } from "@/pages/tasks/tasks-list/contexts/tasks-context";
import { useState } from "@/hooks/use-state";
import { toaster } from "@/components/toaster/consts";

export function DeleteButton({ taskId }: DeletePopoverProps) {
  const { onDeleteTask } = useTasksContext();
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
      toaster.create({
        title: "Deletada",
        description: "Sua tarefa foi deletada com sucesso!",
        type: "success",
      });
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
          variant="solid"
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
              aria-label="Confirmar deleção"
              colorPalette="red"
              isLoading={isLoading}
              onClick={handleDelete}
            >
              Confirmar
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}
