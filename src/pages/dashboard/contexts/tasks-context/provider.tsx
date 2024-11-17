import { useTableList } from "@/hooks/use-table-list";
import { PropsWithChildren } from "react";
import { TasksContext } from "./context";

export function TasksProvider({ children }: PropsWithChildren) {
  const { isLoading, data, pagination } = useTableList("tasks", {
    due_date: "2025-02-10",
  });
  // console.log("PAGINATION", pagination);
  return (
    <TasksContext.Provider
      value={{
        isLoading,
        tasks: data,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
