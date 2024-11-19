import { Card, Group } from "@chakra-ui/react";
import { useTasksContext } from "@/pages/tasks/tasks-list/contexts/tasks-context";
import { TasksLoader } from "./components/tasks-loader";
import { Tasks } from "@/types/tasks";
import { TaskDetails } from "./components/task-details";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/pagination";

export function List() {
  const { isLoading, tasks, pagination, setCurrentPage } = useTasksContext();

  return (
    <Card.Root width="600px">
      <Card.Body gap={2} transition="width 200ms ease, min-width 200ms ease">
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
        <PaginationRoot
          variant="solid"
          count={pagination.total}
          page={pagination.page}
          onPageChange={(e) => setCurrentPage(e.page)}
        >
          <Group attached>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </Group>
        </PaginationRoot>
      </Card.Footer>
    </Card.Root>
  );
}
