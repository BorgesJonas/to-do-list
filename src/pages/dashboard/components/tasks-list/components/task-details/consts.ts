import { TasksPriorities } from "@/enums/tasks-priorities";
import { TasksStatus } from "@/enums/tasks-status";

export const prioritiesTagsSchema: Record<TasksPriorities, string> = {
  [TasksPriorities.HIGHEST]: "red",
  [TasksPriorities.HIGH]: "orange",
  [TasksPriorities.LOW]: "green",
  [TasksPriorities.LOWEST]: "blue",
};

export const statusTagsSchema: Record<TasksStatus, string> = {
  [TasksStatus.COMPLETED]: "teal",
  [TasksStatus.TODO]: "pink",
  [TasksStatus.IN_PROGRESS]: "yellow",
};
