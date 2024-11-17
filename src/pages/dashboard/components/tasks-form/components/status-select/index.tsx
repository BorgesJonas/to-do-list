import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
} from "@/components/select";

import { StatusSelectProps } from "./types";
import { statusOptions } from "./consts";

export function StatusSelect({ portalRef }: StatusSelectProps) {
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
