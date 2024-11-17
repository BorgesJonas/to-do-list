import { Card } from "@chakra-ui/react";
import { useTasksContext } from "../../contexts/tasks-context";
import { TasksLoader } from "./components/tasks-loader";
import { Tasks } from "@/types/tasks";
import { TaskDetails } from "./components/task-details";

export function TasksList() {
  const { isLoading, tasks } = useTasksContext();

  return (
    <Card.Root width="600px">
      <Card.Body gap={2}>
        {isLoading ? (
          <TasksLoader />
        ) : (
          <>
            {tasks.map((task: Tasks) => (
              <TaskDetails key={task.id} task={task} />
            ))}
          </>
        )}
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <p>PAGINATION</p>
      </Card.Footer>
    </Card.Root>
  );
}
