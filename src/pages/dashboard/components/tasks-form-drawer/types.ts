export interface TasksFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FormValues {
  title: string;
  dueDate: string;
  priority: string[] | undefined;
  status: string[] | undefined;
  description: string;
}
