import { Flex, VStack } from "@chakra-ui/react";
import { useState } from "@/hooks/use-state";

import { Header } from "./components/header";
import { Actions } from "./components/actions";

interface DashboardState {
  isCreateDrawerOpen: boolean;
}

export function Dashboard() {
  const [state, setState] = useState<DashboardState>({
    isCreateDrawerOpen: false,
  });

  return (
    <Flex
      as="main"
      height="calc(100vh - 72px)"
      overflow="auto"
      alignItems="center"
      justifyContent="center"
    >
      <VStack>
        <Header />
        <Actions />
      </VStack>
    </Flex>
  );
}
