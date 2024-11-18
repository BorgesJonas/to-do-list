import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/select";

import { statusOptions } from "./consts";
import { StatusSelectProps } from "./types";

export function StatusSelect({ portalRef, ...otherProps }: StatusSelectProps) {
  return (
    <SelectRoot {...otherProps} collection={statusOptions} variant="subtle">
      <SelectLabel>Status</SelectLabel>
      <SelectTrigger>
        <SelectValueText />
      </SelectTrigger>
      <SelectContent portalRef={portalRef}>
        {statusOptions.items.map((status) => (
          <SelectItem item={status} key={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
