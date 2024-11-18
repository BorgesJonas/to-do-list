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
import { schema } from "./schema";
import { service } from "@/service";
import { toaster } from "@/components/toaster/consts";
import { useTasksContext } from "../../contexts/tasks-context";
import { TasksForm } from "../tasks-form";

export function TasksCreateDrawer() {
  const { refetchTasks } = useTasksContext();
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

  async function onSubmit(data: FormValues) {
    const payload = {
      title: data.title,
      due_date: data.dueDate,
      priority: data.priority[0],
      status: data.status[0],
      description: data.description,
    };

    try {
      await service.post("tasks", payload);

      toaster.create({
        title: "Criada",
        description: "Sua tarefa foi criada com sucesso!",
        type: "success",
      });

      refetchTasks();
      handleClose();
    } catch {
      toaster.create({
        title: "Erro",
        description: "Erro ao criar tarefa",
        type: "error",
      });
    }
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
              <Button variant="subtle" isDisabled={isSubmitting}>
                Cancelar
              </Button>
            </DrawerActionTrigger>
            <Button type="submit" isLoading={isSubmitting}>
              Salvar
            </Button>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </FormProvider>
    </DrawerRoot>
  );
}
