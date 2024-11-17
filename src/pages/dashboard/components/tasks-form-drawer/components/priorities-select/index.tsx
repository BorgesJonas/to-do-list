import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/select";

import { prioritiesOptions } from "./consts";
import { PrioritiesSelectProps } from "./types";

export function PrioritiesSelect({
  portalRef,
  ...otherProps
}: PrioritiesSelectProps) {
  return (
    <SelectRoot collection={prioritiesOptions} {...otherProps}>
      <SelectLabel>Prioridade</SelectLabel>
      <SelectTrigger>
        <SelectValueText />
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
