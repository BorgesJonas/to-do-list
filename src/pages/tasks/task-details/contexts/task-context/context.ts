import { createContext, useContext } from "react";
import { TaskProviderValues } from "./types";

export const TaskContext = createContext<TaskProviderValues>(
  {} as TaskProviderValues
);

export function useTaskContext() {
  return useContext(TaskContext);
}
