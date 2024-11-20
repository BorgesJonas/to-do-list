import { formatDate } from "@/common/formatters";
import { Tooltip } from "@/components/tooltip";
import { Card, Flex, Grid, GridItem, IconButton, Text } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "./components/delete-button";
import { useTaskContext } from "@/pages/tasks/task-details/contexts/task-context";
import { prioritiesLabels } from "@/pages/tasks/common/consts";

export function Details() {
  const navigate = useNavigate();
  const { task, isLoading, onEditTaskDrawerVisible } = useTaskContext();

  const isActionsDisabled = !task;

  function handleGoBack() {
    navigate(-1);
  }

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Card.Root width={800}>
        <Card.Body gap={2} transition="width 200ms ease, min-width 200ms ease">
          <Flex justifyContent="space-between">
            <Flex gap={2} alignItems="center">
              <IconButton variant="ghost" onClick={handleGoBack}>
                <IoArrowBack />
              </IconButton>
              <Card.Title fontSize="xl">{task?.title}</Card.Title>
            </Flex>

            <Flex>
              <Tooltip content="Editar">
                <IconButton
                  variant="ghost"
                  disabled={isActionsDisabled}
                  onClick={onEditTaskDrawerVisible}
                >
                  <FiEdit color="green" />
                </IconButton>
              </Tooltip>
              <Tooltip disabled={isActionsDisabled} content="Deletar">
                <DeleteButton
                  taskId={task?.id}
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
                <Text>Data de vencimento: {formatDate(task?.due_date)}</Text>
              </GridItem>
              <GridItem>
                <Text>Prioridade: {prioritiesLabels[task?.priority]}</Text>
              </GridItem>
              <GridItem mb={6}>
                <Text>Status: {statusLabels[task?.status]}</Text>
              </GridItem>
              <GridItem>
                <Text>Descrição:</Text>
              </GridItem>
              <GridItem>
                <Text>{task?.description}</Text>
              </GridItem>
            </Grid>
          )}
        </Card.Body>
      </Card.Root>
    </>
  );
}
