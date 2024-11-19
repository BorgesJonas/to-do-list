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
    await onDeleteTask(taskId);
    setState({ isLoading: false });
  }

  return (
    <PopoverRoot
      open={isPopoverVisible}
      onOpenChange={(e) => setState({ isPopoverVisible: e.open })}
    >
      <PopoverTrigger asChild>
        <IconButton variant="solid" onClick={handlePopoverVisible}>
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
