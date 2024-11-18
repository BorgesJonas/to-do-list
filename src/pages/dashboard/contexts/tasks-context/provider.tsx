import { useTableList } from "@/hooks/use-table-list";
import { PropsWithChildren } from "react";
import { TasksContext } from "./context";
import { Task } from "@/types/task";
import { useState } from "@/hooks/use-state";
import { TasksProviderState, TaskEditParams, TaskCreateParams } from "./types";
import { toaster } from "@/components/toaster/consts";
import { service } from "@/service";

export function TasksProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<TasksProviderState>({
    isCreateDrawerOpen: false,
    isEditDrawerOpen: false,
    selectedTask: {} as Task,
  });

  const { isLoading, data, pagination, refetch, setCurrentPage } = useTableList<
    _,
    Task[]
  >("tasks");

  const { isCreateDrawerOpen, isEditDrawerOpen } = state;

  function handleCreateTaskDrawerVisible() {
    setState({ isCreateDrawerOpen: !isCreateDrawerOpen });
  }

  function handleEditTaskDrawerVisible(task?: Task) {
    setState({ isEditDrawerOpen: !isEditDrawerOpen, selectedTask: task });
  }

  async function handleEditTask(task: TaskEditParams) {
    const { id, ...otherProps } = task;

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

  async function handleCreateTask(task: TaskCreateParams) {
    try {
      await service.post("tasks", task);

      toaster.create({
        title: "Criada",
        description: "Sua tarefa foi criada com sucesso!",
        type: "success",
      });

      refetch();
    } catch {
      toaster.create({
        title: "Erro",
        description: "Erro ao criar tarefa",
        type: "error",
      });
    }
  }

  return (
    <TasksContext.Provider
      value={{
        ...state,
        isLoading,
        tasks: data,
        pagination,
        setCurrentPage,
        refetchTasks: refetch,
        onEditTask: handleEditTask,
        onCreateTask: handleCreateTask,
        onCreateTaskDrawerVisible: handleCreateTaskDrawerVisible,
        onEditTaskDrawerVisible: handleEditTaskDrawerVisible,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
