import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
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
import { useTaskContext } from "@/pages/tasks/task-details/contexts/task-context";

export function DeleteButton({ taskId, onDeleteSuccess }: DeletePopoverProps) {
  const { onDeleteTask } = useTaskContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  function handlePopoverVisible() {
    setPopoverVisible(!isPopoverVisible);
  }

  async function handleDelete() {
    setIsLoading(true);
    await onDeleteTask(taskId);
    setIsLoading(false);
    onDeleteSuccess();
  }

  return (
    <PopoverRoot
      open={isPopoverVisible}
      onOpenChange={(e) => setPopoverVisible(e.open)}
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
