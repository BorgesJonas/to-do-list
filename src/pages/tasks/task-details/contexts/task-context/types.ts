import { Task } from "@/types/tasks";

export type TaskEditParams = Task;

export interface TaskProviderState {
  isEditDrawerOpen: boolean;
}

export interface TaskProviderValues extends TaskProviderState {
  task: Task;
  isLoading: boolean;
  onDeleteTask: (id: string) => void;
  onEditTask: (taskFormValues: TaskEditParams) => void;
  onEditTaskDrawerVisible: () => void;
}
