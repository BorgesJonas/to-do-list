import { useTableList } from "@/hooks/use-table-list";
import { PropsWithChildren } from "react";
import { TasksContext } from "./context";

export function TasksProvider({ children }: PropsWithChildren) {
  const { isLoading, data, pagination, refetch, setCurrentPage } = useTableList(
    "tasks",
    {}
  );

  return (
    <TasksContext.Provider
      value={{
        isLoading,
        tasks: data,
        pagination,
        setCurrentPage,
        refetchTasks: refetch,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
