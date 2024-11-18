import { Flex, Spinner } from "@chakra-ui/react";

export function TasksLoader() {
  return (
    <Flex
      width="100%"
      justifyContent="center"
      alignItems="center"
      height="200px"
    >
      <Spinner size="md" color="inherit" />
    </Flex>
  );
}
