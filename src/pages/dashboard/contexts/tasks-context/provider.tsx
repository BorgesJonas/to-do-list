import { useTableList } from "@/hooks/use-table-list";
import { PropsWithChildren } from "react";
import { TasksContext } from "./context";
import { Task } from "@/types/task";
import { useState } from "@/hooks/use-state";
import { TasksProviderState } from "./types";

export function TasksProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<TasksProviderState>({
    isCreateDrawerOpen: false,
    isEditDrawerOpen: false,
    selectedTask: {} as Task,
  });

  const { isCreateDrawerOpen, isEditDrawerOpen } = state;

  function handleCreateTaskDrawerVisible() {
    setState({ isCreateDrawerOpen: !isCreateDrawerOpen });
  }

  function handleEditTaskDrawerVisible(task: Task) {
    setState({ isEditDrawerOpen: !isEditDrawerOpen, selectedTask: task });
  }
  const { isLoading, data, pagination, refetch, setCurrentPage } = useTableList<
    _,
    Task[]
  >("tasks");

  return (
    <TasksContext.Provider
      value={{
        ...state,
        isLoading,
        tasks: data,
        pagination,
        setCurrentPage,
        refetchTasks: refetch,
        onCreateTaskDrawerVisible: handleCreateTaskDrawerVisible,
        onEditTaskDrawerVisible: handleEditTaskDrawerVisible,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
