import { Tasks } from "@/types/tasks";
import { Pagination } from "@/hooks/use-table-list/types";
import { Task } from "@/types/task";

export interface TasksProviderState {
  isCreateDrawerOpen: boolean;
  isEditDrawerOpen: boolean;
  selectedTask: Task;
}

export interface TasksProviderValues {
  tasks: Tasks[];
  isLoading: boolean;
  pagination: Pagination;
  refetchTasks: () => void;
  setCurrentPage: (page: number) => void;
  onCreateTaskDrawerVisible: () => void;
  onEditTaskDrawerVisible: (task: Task) => void;
}
