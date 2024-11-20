import { formatDate } from "@/common/formatters";
import { Tooltip } from "@/components/tooltip";
import {
  Card,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "./components/delete-button";
import { useTaskContext } from "@/pages/tasks/task-details/contexts/task-context";
import { prioritiesLabels, statusLabels } from "@/pages/tasks/common/consts";
import { Button } from "@/components/button";
import { TasksStatus } from "@/enums/tasks-status";
import { TasksPriorities } from "@/enums/tasks-priorities";

export function Details() {
  const navigate = useNavigate();
  const { task, isLoading, onEditTaskDrawerVisible } = useTaskContext();

  const isActionsDisabled = !task;

  function handleGoBack() {
    navigate("/tasks");
  }

  return (
    <>
      <Card.Root width={800}>
        <Card.Body gap={2} transition="width 200ms ease, min-width 200ms ease">
          {isLoading && (
            <Flex
              height="320px"
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner size="lg" />
            </Flex>
          )}

          {!isLoading && !task && (
            <Flex
              height="100%"
              width="100%"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Text mb={8}>Tarefa não encontrada</Text>
              <Button
                variant="solid"
                aria-label="Ir para tarefas"
                onClick={handleGoBack}
              >
                Ir para tarefas
              </Button>
            </Flex>
          )}

          {!isLoading && !!task && (
            <>
              <Flex justifyContent="space-between">
                <Flex gap={2} alignItems="center">
                  <IconButton variant="ghost" onClick={handleGoBack}>
                    <IoArrowBack />
                  </IconButton>
                  <Card.Title fontSize="xl">{task.title}</Card.Title>
                </Flex>

                <Flex>
                  <Tooltip content="Editar">
                    <IconButton
                      variant="ghost"
                      aria-label="editar tarefa"
                      disabled={isActionsDisabled}
                      onClick={onEditTaskDrawerVisible}
                    >
                      <FiEdit color="green" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip disabled={isActionsDisabled} content="Deletar">
                    <DeleteButton
                      taskId={task.id}
                      onDeleteSuccess={handleGoBack}
                    />
                  </Tooltip>
                </Flex>
              </Flex>

              <Grid gap={2}>
                <GridItem>
                  <Text>Data de vencimento: {formatDate(task.due_date)}</Text>
                </GridItem>
                <GridItem>
                  <Text>
                    Prioridade:{" "}
                    {prioritiesLabels[task.priority as TasksPriorities]}
                  </Text>
                </GridItem>
                <GridItem mb={6}>
                  <Text>
                    Status: {statusLabels[task.status as TasksStatus]}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text>Descrição:</Text>
                </GridItem>
                <GridItem>
                  <Text>{task.description}</Text>
                </GridItem>
              </Grid>
            </>
          )}
        </Card.Body>
      </Card.Root>
    </>
  );
}
