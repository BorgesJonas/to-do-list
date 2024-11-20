import { RefObject } from "react";

export interface TasksFormProps {
  drawerRef: RefObject<HTMLDivElement>;
}

export interface FormValues {
  title: string;
  dueDate: string;
  priority: (string | undefined)[];
  status: (string | undefined)[];
  description: string;
}
