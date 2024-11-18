import { TasksPriorities } from "@/enums/tasks-priorities";
import { TasksStatus } from "@/enums/tasks-status";

export interface Task {
  id: string;
  title: string;
  due_date: string;
  priority: TasksPriorities;
  status: TasksStatus;
  description: string;
}
