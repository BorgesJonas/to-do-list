import { createListCollection } from "@chakra-ui/react";
import { TasksStatus } from "@/enums/tasks-status";

const prioritiesLabels: Record<TasksStatus, string> = {
  [TasksStatus.COMPLETED]: "Completa",
  [TasksStatus.IN_PROGRESS]: "Em progresso",
  [TasksStatus.TODO]: "A fazer",
};

export const statusOptions = createListCollection({
  items: Object.values(TasksStatus).map((value) => ({
    label: prioritiesLabels[value],
    value,
  })),
});
