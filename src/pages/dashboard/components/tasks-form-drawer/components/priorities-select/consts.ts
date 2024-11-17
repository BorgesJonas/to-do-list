import { createListCollection } from "@chakra-ui/react";
import { TasksPriorities } from "@/enums/tasks-priorities";

const prioritiesLabels: Record<TasksPriorities, string> = {
  [TasksPriorities.HIGHEST]: "Muito Alta",
  [TasksPriorities.HIGH]: "Alta",
  [TasksPriorities.LOW]: "Baixa",
  [TasksPriorities.LOWEST]: "Muito Baixa",
};

export const prioritiesOptions = createListCollection({
  items: Object.values(TasksPriorities).map((value) => ({
    label: prioritiesLabels[value],
    value,
  })),
});
