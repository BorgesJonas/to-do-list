import { Flex } from "@chakra-ui/react";
import { Details } from "./components/details";
import { TasksEditDrawer } from "./components/tasks-edit-drawer";
import { TaskProvider } from "./contexts/task-context";

export function TaskDetails() {
  return (
    <TaskProvider>
      <Flex
        as="main"
        overflow="auto"
        alignItems="center"
        justifyContent="center"
        py={8}
      >
        <Details />
        <TasksEditDrawer />
      </Flex>
    </TaskProvider>
  );
}
