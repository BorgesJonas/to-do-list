import { TasksPriorities } from "@/enums/tasks-priorities";

export const prioritiesTagsSchema: Record<TasksPriorities, string> = {
  [TasksPriorities.HIGHEST]: "red",
  [TasksPriorities.HIGH]: "orange",
  [TasksPriorities.LOW]: "green",
  [TasksPriorities.LOWEST]: "blue",
};
