import { Flex, Text } from "@chakra-ui/react";
import { EMPTY_TASKS_MESSAGE } from "./consts";

export function EmptyTasks() {
  return (
    <Flex width="100%" justifyContent="center" alignItems="center">
      <Text>{EMPTY_TASKS_MESSAGE}</Text>
    </Flex>
  );
}
