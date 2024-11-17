import { Flex, VStack } from "@chakra-ui/react";
import { useState } from "@/hooks/use-state";

import { Header } from "./components/header";
import { Actions } from "./components/actions";
import { TasksForm } from "./components/tasks-form";

import { DashboardState } from "./types";
import { StatusSelect } from "./components/tasks-form/components/status-select";

export function Dashboard() {
  const [state, setState] = useState<DashboardState>({
    isCreateDrawerOpen: false,
  });

  const { isCreateDrawerOpen } = state;

  function handleTaskDrawerVisible() {
    setState({ isCreateDrawerOpen: !isCreateDrawerOpen });
  }

  return (
    <>
      <Flex
        as="main"
        height="calc(100vh - 72px)"
        overflow="auto"
        alignItems="center"
        justifyContent="center"
      >
        <VStack>
          <Header />
          <Actions onCreateNewTask={handleTaskDrawerVisible} />
        </VStack>
      </Flex>
      <TasksForm
        isOpen={isCreateDrawerOpen}
        onClose={handleTaskDrawerVisible}
      />
    </>
  );
}
