import { Flex, VStack } from "@chakra-ui/react";

import { Header } from "./components/header";
import { Actions } from "./components/actions";
import { TasksList } from "./components/tasks-list";
import { TasksProvider } from "./contexts/tasks-context/provider";

import { TasksCreateDrawer } from "./components/tasks-create-drawer";
import { TasksEditDrawer } from "./components/tasks-edit-drawer";
import { TasksFiltersDrawer } from "./components/tasks-filters-drawer";

export function Tasks() {
  return (
    <TasksProvider>
      <Flex
        as="main"
        overflow="auto"
        alignItems="center"
        justifyContent="center"
        py={8}
      >
        <VStack gap={8}>
          <Header />
          <Actions />
          <TasksList />
        </VStack>
      </Flex>
      <TasksCreateDrawer />
      <TasksEditDrawer />
      <TasksFiltersDrawer />
    </TasksProvider>
  );
}
