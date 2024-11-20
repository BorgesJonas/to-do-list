import { Task } from "@/types/tasks";
import { Pagination } from "@/hooks/use-table-list/types";
import { Task } from "@/types/task";

export type TaskEditParams = Task;
export type TaskCreateParams = Omit<Task, "id">;

export interface FilterParams {
  due_date?: string;
  priority?: string;
  status?: string;
}

export interface TasksProviderState {
  isCreateDrawerOpen: boolean;
  isEditDrawerOpen: boolean;
  isFiltersDrawerOpen: boolean;
  selectedTask: Task;
}

export interface TasksProviderValues extends TasksProviderState {
  tasks: Tasks[];
  isLoading: boolean;
  pagination: Pagination;
  refetchTasks: () => void;
  setCurrentPage: (page: number) => void;
  onCreateTaskDrawerVisible: () => void;
  onEditTaskDrawerVisible: (task: Task) => void;
  onEditTask: (task: TaskEditParams) => void;
  onCreateTask: (task: TaskCreateParams) => void;
  onDeleteTask: (id: string) => void;
  onFilter: (params: FilterParams) => void;
  onFilterDrawerVisible: () => void;
}
