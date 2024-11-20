import { Field } from "@/components/field";
import { Input, Stack, Textarea } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";
import { PrioritiesSelect } from "../priorities-select";
import { StatusSelect } from "../status-select";
import { FormValues, TasksFormProps } from "./types";

export function TasksForm({ drawerRef }: TasksFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
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

      <Field invalid={!!errors.priority} errorText={errors.priority?.message}>
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

      <Field invalid={!!errors.status} errorText={errors.status?.message}>
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
  );
}
