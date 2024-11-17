import { createContext, useContext } from "react";
import { TasksProviderValues } from "./types";

export const TasksContext = createContext<TasksProviderValues>(
  {} as TasksProviderValues
);

export function useTasksContext() {
  return useContext(TasksContext);
}
