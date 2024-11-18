import { Flex } from "@chakra-ui/react";
import { TasksProvider } from "../tasks/contexts/tasks-context";
import { Details } from "./components/details";

export function TaskDetails() {
  return (
    <TasksProvider>
      <Flex
        as="main"
        overflow="auto"
        alignItems="center"
        justifyContent="center"
        py={8}
      >
        <Details />
      </Flex>
    </TasksProvider>
  );
}
