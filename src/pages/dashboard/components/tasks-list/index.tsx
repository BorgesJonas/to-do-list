import { Card } from "@chakra-ui/react";
import { useTasksContext } from "../../contexts/tasks-context";

export function TasksList() {
  const { isLoading, tasks } = useTasksContext();

  return (
    <Card.Root width="600px">
      <Card.Body gap="2">
        <Card.Title mt="2">Nue Camp</Card.Title>
        {isLoading ? <p>Loading tasks...</p> : <p>{JSON.stringify(tasks)}</p>}
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <p>PAGINATION</p>
      </Card.Footer>
    </Card.Root>
  );
}
