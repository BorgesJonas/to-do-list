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

import { FormValues } from "./types";

import { TasksStatus } from "@/enums/tasks-status";
import { TasksPriorities } from "@/enums/tasks-priorities";
import { useTaskContext } from "@/pages/tasks/task-details/contexts/task-context";
import { TasksForm } from "@/pages/tasks/components/tasks-form";
import { schema } from "@/pages/tasks/components/tasks-form/schema";

export function TasksEditDrawer() {
  const { task, isEditDrawerOpen, onEditTask, onEditTaskDrawerVisible } =
    useTaskContext();
  const drawerRef = useRef<HTMLDivElement>(null);

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
    onEditTaskDrawerVisible();
    reset();
  }

  async function onSubmit(data: FormValues) {
    await onEditTask({
      id: task.id,
      title: data.title,
      due_date: data.dueDate,
      status: data.status[0] as TasksStatus,
      priority: data.priority[0] as TasksPriorities,
      description: data.description,
    });

    handleClose();
  }

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("dueDate", task.due_date);
      setValue("priority", [task.priority]);
      setValue("status", [task.status]);
      setValue("description", task.description);
    }
  }, [setValue, task]);

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
            <DrawerTitle>Editar Tarefa</DrawerTitle>
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
            <Button
              type="submit"
              aria-label="Confirmar edição"
              isLoading={isSubmitting}
            >
              Editar
            </Button>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </FormProvider>
    </DrawerRoot>
  );
}
