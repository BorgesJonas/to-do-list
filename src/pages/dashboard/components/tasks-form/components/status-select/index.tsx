import { createListCollection } from "@chakra-ui/react";
import { TasksStatus } from "@/enums/tasks-status";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/select";

const prioritiesLabels: Record<TasksStatus, string> = {
  [TasksStatus.COMPLETED]: "Completa",
  [TasksStatus.IN_PROGRESS]: "Em progresso",
  [TasksStatus.TODO]: "A fazer",
};

const statusOptions = createListCollection({
  items: Object.values(TasksStatus).map((value) => ({
    label: prioritiesLabels[value],
    value,
  })),
});

export function StatusSelect({ portalRef }) {
  return (
    <SelectRoot collection={statusOptions} variant="subtle">
      <SelectLabel>Status</SelectLabel>
      <SelectTrigger />
      <SelectContent portalRef={portalRef}>
        {statusOptions.items.map((status) => (
          <SelectItem zIndex={1000} item={status} key={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
