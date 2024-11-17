"use client";

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

import { TasksFormProps } from "./types";
import { Input, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "@/components/field";
import { PrioritiesSelect } from "./components/priorities-select";
import { StatusSelect } from "./components/status-select";
import { useRef } from "react";

export function TasksForm({ isOpen, onClose }: TasksFormProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <DrawerRoot open={isOpen} onOpenChange={onClose} size={["full", "md"]}>
      <DrawerBackdrop />
      <DrawerContent ref={contentRef}>
        <DrawerHeader>
          <DrawerTitle>Nova Tarefa</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Stack gap={4}>
            <Field label="Título">
              <Input variant="subtle" />
            </Field>
            <Field label="Data de Vencimento">
              <Input variant="subtle" type="date" />
            </Field>
            <Field invalid={false} errorText="This is an error">
              <PrioritiesSelect portalRef={contentRef} />
            </Field>
            <StatusSelect portalRef={contentRef} />
            <Field label="Descrição">
              <Textarea variant="subtle" size="xl" resize="none" />
            </Field>
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="subtle">Cancelar</Button>
          </DrawerActionTrigger>
          <Button>Salvar</Button>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}
