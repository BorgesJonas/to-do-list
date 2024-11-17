import { Tasks } from "@/types/tasks";

export interface TasksProviderValues {
  tasks: Tasks[];
  isLoading: boolean;
  refetchTasks: () => void;
}
