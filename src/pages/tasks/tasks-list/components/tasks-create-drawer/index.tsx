import { useRef } from "react";
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
import { schema } from "@/pages/tasks/components/tasks-form/schema";
import { useTasksContext } from "@/pages/tasks/tasks-list/contexts/tasks-context";
import { TasksForm } from "@/pages/tasks/components/tasks-form";
import { TasksPriorities } from "@/enums/tasks-priorities";
import { TasksStatus } from "@/enums/tasks-status";

export function TasksCreateDrawer() {
  const { onCreateTask } = useTasksContext();
  const drawerRef = useRef<HTMLDivElement>(null);
  const { isCreateDrawerOpen, onCreateTaskDrawerVisible } = useTasksContext();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  function handleClose() {
    onCreateTaskDrawerVisible();
    reset();
  }

  function onSubmit(data: FormValues) {
    onCreateTask({
      title: data.title,
      due_date: data.dueDate,
      priority: data.priority[0] as TasksPriorities,
      status: data.status[0] as TasksStatus,
      description: data.description,
    });
    handleClose();
  }

  return (
    <DrawerRoot
      open={isCreateDrawerOpen}
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
                aria-label="Cancelar criação"
                variant="subtle"
                isDisabled={isSubmitting}
              >
                Cancelar
              </Button>
            </DrawerActionTrigger>
            <Button
              aria-label="Confirmar envio"
              type="submit"
              isLoading={isSubmitting}
            >
              Salvar
            </Button>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </FormProvider>
    </DrawerRoot>
  );
}
