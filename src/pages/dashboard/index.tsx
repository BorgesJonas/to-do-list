import { Flex, VStack } from "@chakra-ui/react";
import { useState } from "@/hooks/use-state";

import { Header } from "./components/header";
import { Actions } from "./components/actions";
import { TasksFormDrawer } from "./components/tasks-form-drawer";
import { TasksList } from "./components/tasks-list";
import { TasksProvider } from "./contexts/tasks-context/provider";

import { DashboardState } from "./types";

export function Dashboard() {
  const [state, setState] = useState<DashboardState>({
    isCreateDrawerOpen: false,
  });

  const { isCreateDrawerOpen } = state;

  function handleTaskDrawerVisible() {
    setState({ isCreateDrawerOpen: !isCreateDrawerOpen });
  }

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
          <Actions onCreateNewTask={handleTaskDrawerVisible} />
          <TasksList />
        </VStack>
      </Flex>
      <TasksFormDrawer
        isOpen={isCreateDrawerOpen}
        onClose={handleTaskDrawerVisible}
      />
    </TasksProvider>
  );
}
