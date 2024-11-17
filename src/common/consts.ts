import { TasksPriorities } from "@/enums/tasks-priorities";
import { TasksStatus } from "@/enums/tasks-status";

export const statusLabels: Record<TasksStatus, string> = {
  [TasksStatus.COMPLETED]: "Completa",
  [TasksStatus.IN_PROGRESS]: "Em progresso",
  [TasksStatus.TODO]: "A fazer",
};

export const prioritiesLabels: Record<TasksPriorities, string> = {
  [TasksPriorities.HIGHEST]: "Muito Alta",
  [TasksPriorities.HIGH]: "Alta",
  [TasksPriorities.LOW]: "Baixa",
  [TasksPriorities.LOWEST]: "Muito Baixa",
};
