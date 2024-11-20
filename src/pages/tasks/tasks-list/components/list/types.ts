import { Task } from "@/types/tasks";

export interface TasksListProps {
  isLoading: boolean;
  tasks: Task[];
}
