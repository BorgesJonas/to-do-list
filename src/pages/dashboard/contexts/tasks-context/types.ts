import { Tasks } from "@/types/tasks";
import { Pagination } from "@/hooks/use-table-list/types";
export interface TasksProviderValues {
  tasks: Tasks[];
  isLoading: boolean;
  pagination: Pagination;
  refetchTasks: () => void;
  setCurrentPage: (page: number) => void;
}
