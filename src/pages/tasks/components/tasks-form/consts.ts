import { TasksPriorities } from "@/enums/tasks-priorities";
import { TasksStatus } from "@/enums/tasks-status";

export const FORM_MESSAGES = {
  TITLE_REQUIRED: "Campo titulo é obrigatório",
  DUE_DATA_REQUIRED: "Campo data de vecimento é obrigatório",
  PRIORITY_REQUIRED: "Campo prioridade é obrigatório",
  STATUS_REQUIRED: "Campo status é obrigatório",
  DESCRIPTION_REQUIRED: "Campo descrição é obrigatório",
};

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
