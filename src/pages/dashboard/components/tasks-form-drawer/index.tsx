import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { Input, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "@/components/field";

import { PrioritiesSelect } from "./components/priorities-select";
import { StatusSelect } from "./components/status-select";

import { FormValues, TasksFormProps } from "./types";
import { schema } from "./schema";

export function TasksFormDrawer({ isOpen, onClose }: TasksFormProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    formState: { errors },
    control,
    reset,
    register,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  function handleClose() {
    onClose();
    reset();
  }

  async function onSubmit(data: FormValues) {
    console.log("DATA", data);
  }

  return (
    <DrawerRoot open={isOpen} onOpenChange={handleClose} size={["full", "md"]}>
      <DrawerBackdrop />
      <DrawerContent
        ref={contentRef}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        overflow="auto"
      >
        <DrawerHeader>
          <DrawerTitle>Nova Tarefa</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Stack gap={4}>
            <Field
              label="Título"
              invalid={!!errors?.title}
              errorText={errors?.title?.message}
            >
              <Input variant="subtle" {...register("title")} />
            </Field>

            <Field
              label="Data de Vencimento"
              invalid={!!errors?.dueDate}
              errorText={errors?.dueDate?.message}
            >
              <Input variant="subtle" type="date" {...register("dueDate")} />
            </Field>

            <Field
              invalid={!!errors.priority}
              errorText={errors.priority?.message}
            >
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <PrioritiesSelect
                    name={field.name}
                    value={field.value}
                    portalRef={contentRef}
                    variant="subtle"
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                  />
                )}
              />
            </Field>

            <Field invalid={!!errors.status} errorText={errors.status?.message}>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <StatusSelect
                    variant="subtle"
                    name={field.name}
                    value={field.value}
                    portalRef={contentRef}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                  />
                )}
              />
            </Field>

            <Field
              label="Descrição"
              invalid={!!errors.description}
              errorText={errors.description?.message}
            >
              <Textarea
                variant="subtle"
                size="xl"
                resize="none"
                {...register("description")}
              />
            </Field>
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="subtle">Cancelar</Button>
          </DrawerActionTrigger>
          <Button type="submit">Salvar</Button>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}
