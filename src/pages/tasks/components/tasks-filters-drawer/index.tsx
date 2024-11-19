import { Button } from "@/components/button";
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
import { Field } from "@/components/field";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { PrioritiesSelect } from "../priorities-select";
import { StatusSelect } from "../status-select";
import { Flex, Input } from "@chakra-ui/react";
import { useTasksContext } from "@/pages/tasks/tasks-list/contexts/tasks-context";
import { FormValues } from "./types";
import { TasksStatus } from "@/enums/tasks-status";
import { TasksPriorities } from "@/enums/tasks-priorities";

export function TasksFiltersDrawer() {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { isFiltersDrawerOpen, onFilterDrawerVisible, onFilter } =
    useTasksContext();

  const {
    control,
    formState: { isSubmitting },
    reset,
    register,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      dueDate: undefined,
      priority: [""],
      status: [""],
    },
  });

  function onSubmit(data: FormValues) {
    onFilter({
      due_date: data?.dueDate,
      status: (data?.status[0] as TasksStatus) || undefined,
      priority: (data?.priority[0] as TasksPriorities) || undefined,
    });
    onFilterDrawerVisible();
  }

  return (
    <DrawerRoot
      open={isFiltersDrawerOpen}
      onOpenChange={onFilterDrawerVisible}
      size={["full", "md"]}
    >
      <DrawerBackdrop />
      <DrawerContent
        ref={drawerRef}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        overflow="auto"
      >
        <DrawerHeader>
          <DrawerTitle>Filtros</DrawerTitle>
        </DrawerHeader>
        <DrawerBody display="flex" flexDirection="column" gap={4}>
          <Field label="Data de Vencimento">
            <Input variant="subtle" type="date" {...register("dueDate")} />
          </Field>

          <Field>
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <PrioritiesSelect
                  name={field.name}
                  value={field.value as string[]}
                  portalRef={drawerRef}
                  variant="subtle"
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                />
              )}
            />
          </Field>

          <Field>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <StatusSelect
                  variant="subtle"
                  name={field.name}
                  value={field.value as string[]}
                  portalRef={drawerRef}
                  onValueChange={({ value }) => field.onChange(value)}
                  onInteractOutside={() => field.onBlur()}
                />
              )}
            />
          </Field>
          <Flex>
            <Button
              aria-label="resetar filtros"
              variant="plain"
              onClick={() => reset()}
            >
              Resetar Filtros
            </Button>
          </Flex>
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
            aria-label="Confirmar edição"
            type="submit"
            isLoading={isSubmitting}
          >
            Editar
          </Button>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}
