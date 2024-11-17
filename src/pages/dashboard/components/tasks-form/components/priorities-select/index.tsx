import { createListCollection } from "@chakra-ui/react";
import { TasksPriorities } from "@/enums/tasks-priorities";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/select";

const prioritiesLabels: Record<TasksPriorities, string> = {
  [TasksPriorities.HIGHEST]: "Muito Alta",
  [TasksPriorities.HIGH]: "Alta",
  [TasksPriorities.LOW]: "Baixa",
  [TasksPriorities.LOWEST]: "Muito Baixa",
};

const prioritiesOptions = createListCollection({
  items: Object.values(TasksPriorities).map((value) => ({
    label: prioritiesLabels[value],
    value,
  })),
});

export function PrioritiesSelect({ portalRef }) {
  return (
    <SelectRoot collection={prioritiesOptions} variant="subtle">
      <SelectLabel>Prioridade</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Select a prioridade" />
      </SelectTrigger>
      <SelectContent portalRef={portalRef}>
        {prioritiesOptions.items.map((priority) => (
          <SelectItem item={priority} key={priority.value}>
            {priority.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
