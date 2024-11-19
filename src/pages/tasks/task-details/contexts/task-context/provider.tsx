import { PropsWithChildren } from "react";
import { TaskContext } from "./context";
import { Task } from "@/types/task";
import { useState } from "@/hooks/use-state";
import { TaskProviderState, TaskEditParams } from "./types";
import { toaster } from "@/components/toaster/consts";
import { service } from "@/service";
import { useGet } from "@/hooks/use-get";
import { useParams } from "react-router-dom";

export function TaskProvider({ children }: PropsWithChildren) {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<TaskProviderState>({
    isEditDrawerOpen: false,
  });

  const { isEditDrawerOpen } = state;

  const { isLoading, data, error, refetch } = useGet<Task>(`tasks/${id}`);

  function handleEditTaskDrawerVisible() {
    setState({ isEditDrawerOpen: !isEditDrawerOpen });
  }

  async function handleEditTask(taskFormValues: TaskEditParams) {
    const { id, ...otherProps } = taskFormValues;

    try {
      await service.put(`tasks/${id}`, { ...otherProps });

      toaster.create({
        title: "Criada",
        description: "Sua tarefa foi editada com sucesso!",
        type: "success",
      });
      refetch();
    } catch {
      toaster.create({
        title: "Erro",
        description: "Erro ao editar tarefa",
        type: "error",
      });
    }
  }

  async function handleDeleteTask(id: string) {
    try {
      await service.delete(`tasks/${id}`);
      toaster.create({
        title: "Criada",
        description: "Sua tarefa foi deletada com sucesso!",
        type: "success",
      });
      refetch();
    } catch {
      toaster.create({
        title: "Erro",
        description: "Houve um erro ao tentar deletar a task",
        type: "error",
      });
    }
  }

  return (
    <TaskContext.Provider
      value={{
        ...state,
        isLoading,
        task: data,
        onEditTask: handleEditTask,
        onDeleteTask: handleDeleteTask,
        onEditTaskDrawerVisible: handleEditTaskDrawerVisible,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
