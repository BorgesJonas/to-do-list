import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "@/components/drawer";

import { FormValues, TasksEditDrawerProps } from "./types";
import { schema } from "./schema";
import { useTasksContext } from "@/pages/tasks/contexts/tasks-context";
import { TasksForm } from "../tasks-form";
import { Task } from "@/types/task";
import { TasksStatus } from "@/enums/tasks-status";
import { TasksPriorities } from "@/enums/tasks-priorities";

export function TasksEditDrawer({ onEditSuccess }: TasksEditDrawerProps) {
  const { onEditTask } = useTasksContext();
  const drawerRef = useRef<HTMLDivElement>(null);
  const { selectedTask, onEditTaskDrawerVisible, isEditDrawerOpen } =
    useTasksContext();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const {
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  function handleClose() {
    onEditTaskDrawerVisible({} as Task);
    reset();
  }

  async function onSubmit(data: FormValues) {
    await onEditTask({
      id: selectedTask.id,
      title: data.title,
      due_date: data.dueDate,
      status: data.status[0] as TasksStatus,
      priority: data.priority[0] as TasksPriorities,
      description: data.description,
    });

    if (onEditSuccess) onEditSuccess();

    handleClose();
  }

  useEffect(() => {
    if (selectedTask) {
      setValue("title", selectedTask.title);
      setValue("dueDate", selectedTask.due_date);
      setValue("priority", [selectedTask.priority]);
      setValue("status", [selectedTask.status]);
      setValue("description", selectedTask.description);
    }
  }, [setValue, selectedTask]);

  return (
    <DrawerRoot
      open={isEditDrawerOpen}
      onOpenChange={handleClose}
      size={["full", "md"]}
    >
      <DrawerBackdrop />
      <FormProvider {...methods}>
        <DrawerContent
          ref={drawerRef}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          overflow="auto"
        >
          <DrawerHeader>
            <DrawerTitle>Nova Tarefa</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <TasksForm drawerRef={drawerRef} />
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button
                aria-label="Cancelar edição"
                variant="subtle"
                isDisabled={isSubmitting}
              >
                Cancelar
              </Button>
            </DrawerActionTrigger>
            <Button type="submit" isLoading={isSubmitting}>
              Editar
            </Button>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </FormProvider>
    </DrawerRoot>
  );
}
