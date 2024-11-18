import { prioritiesLabels, statusLabels } from "@/common/consts";
import { formatDate } from "@/common/formatters";
import { Tooltip } from "@/components/tooltip";
import useGet from "@/hooks/use-get/use-get";
import { TasksEditDrawer } from "@/pages/tasks/components/tasks-edit-drawer";
import { useTasksContext } from "@/pages/tasks/contexts/tasks-context";
import { Task } from "@/types/task";
import { Card, Flex, Grid, GridItem, IconButton, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteButton } from "./components/delete-button";

export function Details() {
  const navigate = useNavigate();
  const { onEditTaskDrawerVisible } = useTasksContext();
  const { id } = useParams<{ id: string }>();

  const { isLoading, data, error, refetch } = useGet<Task>(`tasks/${id}`);
  const isActionsDisabled = !data;

  function handleGoBack() {
    navigate(-1);
  }

  function handleEditTask() {
    onEditTaskDrawerVisible(data as Task);
  }

  useEffect(() => {
    if (error) {
      console.log("Error");
    }
  }, [error]);

  return (
    <>
      <Card.Root width={800}>
        <Card.Body gap={2} transition="width 200ms ease, min-width 200ms ease">
          <Flex justifyContent="space-between">
            <Flex gap={2} alignItems="center">
              <IconButton variant="ghost" onClick={handleGoBack}>
                <IoArrowBack />
              </IconButton>
              <Card.Title fontSize="xl">{data?.title}</Card.Title>
            </Flex>

            <Flex>
              <Tooltip content="Editar">
                <IconButton
                  variant="ghost"
                  disabled={isActionsDisabled}
                  onClick={handleEditTask}
                >
                  <FiEdit color="green" />
                </IconButton>
              </Tooltip>
              <Tooltip disabled={isActionsDisabled} content="Deletar">
                <DeleteButton
                  taskId={data?.id}
                  onDeleteSuccess={handleGoBack}
                />
              </Tooltip>
            </Flex>
          </Flex>
          {isLoading ? (
            <p>Loading</p>
          ) : (
            <Grid gap={2}>
              <GridItem>
                <Text>Data de vencimento: {formatDate(data?.due_date)}</Text>
              </GridItem>
              <GridItem>
                <Text>Prioridade: {prioritiesLabels[data?.priority]}</Text>
              </GridItem>
              <GridItem mb={6}>
                <Text>Status: {statusLabels[data?.status]}</Text>
              </GridItem>
              <GridItem>
                <Text>Descrição:</Text>
              </GridItem>
              <GridItem>
                <Text>{data?.description}</Text>
              </GridItem>
            </Grid>
          )}
        </Card.Body>
      </Card.Root>
      <TasksEditDrawer onEditSuccess={refetch} />
    </>
  );
}
