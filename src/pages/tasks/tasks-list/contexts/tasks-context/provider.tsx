import { useTableList } from "@/hooks/use-table-list";
import { PropsWithChildren } from "react";
import { TasksContext } from "./context";
import { Task } from "@/types/task";
import { useState } from "@/hooks/use-state";
import {
  TasksProviderState,
  TaskEditParams,
  TaskCreateParams,
  FilterParams,
} from "./types";
import { toaster } from "@/components/toaster/consts";
import { service } from "@/service";

export function TasksProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<TasksProviderState>({
    isFiltersDrawerOpen: false,
    isCreateDrawerOpen: false,
    isEditDrawerOpen: false,
    selectedTask: {} as Task,
  });

  const { isCreateDrawerOpen, isEditDrawerOpen, isFiltersDrawerOpen } = state;

  const { isLoading, data, pagination, refetch, setCurrentPage, setParams } =
    useTableList<Task, FilterParams>("tasks");

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

  function handleFilterDrawerVisible() {
    setState({ isFiltersDrawerOpen: !isFiltersDrawerOpen });
  }

  function handleFilter(filters: FilterParams) {
    setParams(filters);
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
        onDeleteTask: handleDeleteTask,
        onCreateTask: handleCreateTask,
        onCreateTaskDrawerVisible: handleCreateTaskDrawerVisible,
        onEditTaskDrawerVisible: handleEditTaskDrawerVisible,
        onFilter: handleFilter,
        onFilterDrawerVisible: handleFilterDrawerVisible,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
