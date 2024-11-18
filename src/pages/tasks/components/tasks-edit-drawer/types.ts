export interface TasksEditDrawerProps {
  onEditSuccess?: () => void;
}

export interface FormValues {
  title: string;
  dueDate: string;
  priority: (string | undefined)[];
  status: (string | undefined)[];
  description: string;
}
