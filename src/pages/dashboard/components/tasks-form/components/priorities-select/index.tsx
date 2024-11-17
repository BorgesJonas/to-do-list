import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
} from "@/components/select";

import { PrioritiesSelectProps } from "./types";
import { prioritiesOptions } from "./consts";

export function PrioritiesSelect({ portalRef }: PrioritiesSelectProps) {
  return (
    <SelectRoot collection={prioritiesOptions} variant="subtle">
      <SelectLabel>Prioridade</SelectLabel>
      <SelectTrigger />
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
