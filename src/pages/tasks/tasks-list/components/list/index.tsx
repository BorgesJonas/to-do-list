import { Card, Group } from "@chakra-ui/react";
import { useTasksContext } from "@/pages/tasks/tasks-list/contexts/tasks-context";
import { TasksLoader } from "./components/tasks-loader";
import { Task } from "@/types/task";
import { TaskDetails } from "./components/task-details";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/pagination";
import { EmptyTasks } from "./components/empty-tasks";

export function List() {
  const { isLoading, tasks, pagination, setCurrentPage } = useTasksContext();

  return (
    <Card.Root width={["auto", "600px"]} minWidth="300px">
      <Card.Body gap={2} transition="width 200ms ease, min-width 200ms ease">
        {isLoading && <TasksLoader />}
        {!isLoading && !tasks.length && <EmptyTasks />}
        {!isLoading && !!tasks.length && (
          <>
            {tasks.map((task: Task) => (
              <TaskDetails key={task.id} task={task} />
            ))}
          </>
        )}
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <PaginationRoot
          variant="solid"
          count={pagination.total}
          page={pagination.currentPage}
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
