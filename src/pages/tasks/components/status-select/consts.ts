import { createListCollection } from "@chakra-ui/react";
import { TasksStatus } from "@/enums/tasks-status";
import { statusLabels } from "../../common/consts";

export const statusOptions = createListCollection({
  items: Object.values(TasksStatus).map((value) => ({
    label: statusLabels[value],
    value,
  })),
});
