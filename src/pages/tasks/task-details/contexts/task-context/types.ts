import { Tasks } from "@/types/tasks";

import { Task } from "@/types/task";

export type TaskEditParams = Task;

export interface TaskProviderState {
  isEditDrawerOpen: boolean;
}

export interface TaskProviderValues extends TaskProviderState {
  task: Tasks;
  isLoading: boolean;
  onDeleteTask: (id: string) => void;
  onEditTask: (taskFormValues: TaskEditParams) => void;
  onEditTaskDrawerVisible: () => void;
}
