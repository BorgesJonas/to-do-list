import { createListCollection } from "@chakra-ui/react";
import { TasksPriorities } from "@/enums/tasks-priorities";
import { prioritiesLabels } from "@/common/consts";

export const prioritiesOptions = createListCollection({
  items: Object.values(TasksPriorities).map((value) => ({
    label: prioritiesLabels[value],
    value,
  })),
});
