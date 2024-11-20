import { Flex, VStack } from "@chakra-ui/react";

import { Header } from "./components/header";
import { Actions } from "./components/actions";
import { List } from "./components/list";
import { TasksProvider } from "@/pages/tasks/tasks-list/contexts/tasks-context";

import { TasksCreateDrawer } from "./components/tasks-create-drawer";
import { TasksEditDrawer } from "./components/tasks-edit-drawer";
import { TasksFiltersDrawer } from "../components/tasks-filters-drawer";

export function TasksList() {
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
          <List />
        </VStack>
      </Flex>
      <TasksCreateDrawer />
      <TasksEditDrawer />
      <TasksFiltersDrawer />
    </TasksProvider>
  );
}
