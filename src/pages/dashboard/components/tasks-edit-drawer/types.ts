import { Task } from "@/types/task";

export interface TasksEditDrawerProps {
  isOpen: boolean;
  task: Task;
  onClose: () => void;
}

export interface FormValues {
  title: string;
  dueDate: string;
  priority: (string | undefined)[];
  status: (string | undefined)[];
  description: string;
}
