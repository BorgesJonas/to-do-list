import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/popover";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { Button } from "@/components/button";
import { DeletePopoverProps } from "./types";
import { useTasksContext } from "@/pages/dashboard/contexts/tasks-context";
import { service } from "@/service";
import { toaster } from "@/components/toaster/consts";

export function DeleteButton({ taskId }: DeletePopoverProps) {
  const { refetchTasks } = useTasksContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isPopoverVisible, setPopoverVisible] = useState(false);

  function handlePopoverVisible() {
    setPopoverVisible(!isPopoverVisible);
  }

  async function handleDelete() {
    setIsLoading(true);

    try {
      await service.delete(`tasks/${taskId}`);
      toaster.create({
        title: "Criada",
        description: "Sua tarefa fio criada com sucesso!",
        type: "success",
      });
      refetchTasks();
    } catch {
      toaster.create({
        title: "Erro",
        description: "Houve um erro ao tentar deletar a task",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PopoverRoot
      open={isPopoverVisible}
      onOpenChange={(e) => setPopoverVisible(e.open)}
    >
      <PopoverTrigger asChild>
        <IconButton variant="ghost" onClick={handlePopoverVisible}>
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
            >
              Confirmar
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
}
