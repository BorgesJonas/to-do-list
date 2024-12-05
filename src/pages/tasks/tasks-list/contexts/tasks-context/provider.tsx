import { PropsWithChildren } from "react";
import { useTableList } from "@/hooks/use-table-list";
import { Task } from "@/types/task";
import { useState } from "@/hooks/use-state";
import { service } from "@/service";
import { TasksContext } from "./context";
import {
  TasksProviderState,
  TaskEditParams,
  TaskCreateParams,
  FilterParams,
} from "./types";

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
    await service.put(`tasks/${id}`, { ...otherProps });
    refetch();
  }

  async function handleCreateTask(task: TaskCreateParams) {
    await service.post("tasks", task);
    refetch();
  }

  async function handleDeleteTask(id: string) {
    await service.delete(`tasks/${id}`);
    refetch();
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
