import { service } from "@/service";
import { server } from "@/setupTests";
import { act, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, vi } from "vitest";
import { TasksPriorities } from "@/enums/tasks-priorities";
import { TasksStatus } from "@/enums/tasks-status";
import { Task } from "@/types/task";
import { customRender } from "@/tests/custom-render";
import { useParams } from "react-router-dom";

import { TaskDetails } from ".";
import userEvent from "@testing-library/user-event";
import { formatDate } from "@/common/formatters";
import { prioritiesLabels, statusLabels } from "../common/consts";

const taskId = "task-id";
const API_URL = service.defaults.baseURL;
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: vi.fn(),
  };
});

function renderComponent() {
  return customRender(<TaskDetails />);
}

describe("TaskDetails component", () => {
  useParams.mockReturnValue({ id: taskId });

  const mockedTask: Task = {
    id: taskId,
    title: "Task title",
    due_date: "2024-11-19",
    status: TasksStatus.TODO,
    priority: TasksPriorities.LOW,
    description: "Task Description",
  };

  it("Should get task and display task details", async () => {
    server.use(
      http.get(`${API_URL}/tasks/${taskId}`, () => {
        return HttpResponse.json(mockedTask);
      })
    );

    renderComponent();

    expect(
      await screen.findByRole("heading", { name: mockedTask.title })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        `Data de vencimento: ${formatDate(mockedTask.due_date)}`
      )
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        `Prioridade: ${prioritiesLabels[mockedTask.priority]}`
      )
    ).toBeInTheDocument();

    expect(
      await screen.findByText(`Status: ${statusLabels[mockedTask.status]}`)
    ).toBeInTheDocument();

    expect(await screen.findByText(`Descrição:`)).toBeInTheDocument();

    expect(await screen.findByText(mockedTask.description)).toBeInTheDocument();
  });

  it("Should show empty message if user not found and navigate to tasks ", async () => {
    server.use(
      http.get(`${API_URL}/tasks/${taskId}`, () => {
        return HttpResponse.json(null);
      })
    );

    renderComponent();

    expect(
      await screen.findByText(/Tarefa não encontrada/i)
    ).toBeInTheDocument();

    const goToTasksButton = screen.getByRole("button", {
      name: /ir para tarefas/i,
    });
    await userEvent.click(goToTasksButton);
    expect(mockNavigate).toHaveBeenCalledWith("/tasks");
  });

  it("Should delete task and be redirected to tasks list ", async () => {
    server.use(
      http.get(`${API_URL}/tasks/${taskId}`, () => {
        return HttpResponse.json(mockedTask);
      }),
      http.delete(`${API_URL}/tasks/${taskId}`, () => {
        return HttpResponse.json(mockedTask);
      })
    );

    renderComponent();

    expect(
      await screen.findByRole("heading", { name: mockedTask.title })
    ).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", {
      name: /deletar tarefa/i,
    });
    await userEvent.click(deleteButton);

    expect(
      await screen.findByText(/Deseja realmente deletar tarefa/i)
    ).toBeVisible();

    const confirmButton = screen.getByRole("button", {
      name: /confirmar deleção/i,
    });

    await userEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/tasks");
    });
  });

  it("Should edit task ", async () => {
    server.use(
      http.put(`${API_URL}/tasks/${taskId}`, async () => {
        return HttpResponse.json(mockedTask);
      }),
      http.get(`${API_URL}/tasks/${taskId}`, () => {
        return HttpResponse.json(mockedTask);
      })
    );

    renderComponent();

    expect(
      await screen.findByRole("heading", { name: mockedTask.title })
    ).toBeInTheDocument();

    const editButton = screen.getByRole("button", { name: /editar tarefa/i });

    await userEvent.click(editButton);

    const drawerTitle = screen.getByRole("heading", { name: /editar tarefa/i });
    expect(drawerTitle).toBeVisible();

    const titleInput = screen.getByRole("textbox", { name: /título/i });
    await userEvent.type(titleInput, mockedTask.title);

    const dueDateInput = screen.getByLabelText(/data de vencimento/i);
    await userEvent.type(dueDateInput, mockedTask.due_date);

    const prioritySelect = screen.getByRole("combobox", {
      name: /prioridade/i,
    });

    await userEvent.click(prioritySelect);

    const lowPriorityOption = screen.getByRole("option", {
      name: prioritiesLabels[mockedTask.priority],
    });

    expect(lowPriorityOption).toBeVisible();

    await userEvent.click(lowPriorityOption);

    const statusSelect = screen.getByRole("combobox", {
      name: /status/i,
    });

    await userEvent.click(statusSelect);

    const statusOption = screen.getByRole("option", {
      name: statusLabels[mockedTask.status],
    });

    expect(statusOption).toBeVisible();

    await userEvent.click(statusOption);

    const descriptionInput = screen.getByRole("textbox", {
      name: /descrição/i,
    });

    await userEvent.type(descriptionInput, mockedTask.description);

    const saveButton = screen.getByRole("button", {
      name: /confirmar edição/i,
    });

    await userEvent.click(saveButton);

    expect(await screen.findByText(mockedTask.title)).toBeInTheDocument();
  });
});
