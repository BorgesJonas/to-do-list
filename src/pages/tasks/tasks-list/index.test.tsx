import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { server } from "@/setupTests";
import { service } from "@/service";
import { http, HttpResponse } from "msw";
import { customRender } from "@/tests/custom-render";
import { EMPTY_TASKS_MESSAGE } from "./components/list/components/empty-tasks/consts";
import { TasksStatus } from "@/enums/tasks-status";
import { Task } from "@/types/task";
import { TasksPriorities } from "@/enums/tasks-priorities";
import userEvent from "@testing-library/user-event";
import { prioritiesLabels, statusLabels } from "../common/consts";
import { formatDate } from "@/common/formatters";

import { TasksList } from ".";

const API_URL = service.defaults.baseURL;

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderComponent() {
  return customRender(<TasksList />);
}

describe("TasksList component", () => {
  const mockedEmptyResponse = {
    first: 1,
    prev: null,
    next: null,
    last: 0,
    pages: 0,
    items: 0,
    data: [],
  };

  it("Should show empty message with api return no tasks", async () => {
    server.use(
      http.get(`${API_URL}/tasks?_page=1&_per_page=10`, () => {
        return HttpResponse.json(mockedEmptyResponse);
      })
    );

    renderComponent();
    const emptyMessage = await screen.findByText(EMPTY_TASKS_MESSAGE);
    expect(emptyMessage).toBeVisible();
  });

  it("Should create a new task", async () => {
    const mockedTask: Task = {
      id: "user-id",
      title: "Task title",
      due_date: "2024-11-19",
      status: TasksStatus.TODO,
      priority: TasksPriorities.LOW,
      description: "Task Description",
    };

    const getResponse = {
      first: 1,
      prev: null,
      next: null,
      last: 0,
      pages: 0,
      items: 0,
      data: [mockedTask],
    };

    let isFirstGet = true;

    server.use(
      http.get(`${API_URL}/tasks`, () => {
        if (isFirstGet) {
          isFirstGet = false;
          return HttpResponse.json(emptyResponse);
        } else {
          return HttpResponse.json(getResponse);
        }
      }),
      http.post(`${API_URL}/tasks`, async () => {
        return HttpResponse.json(mockedTask);
      })
    );

    renderComponent();
    const emptyMessage = await screen.findByText(EMPTY_TASKS_MESSAGE);
    expect(emptyMessage).toBeVisible();

    const createTaskDrawerButton = screen.getByRole("button", {
      name: /criar nova tarefa/i,
    });
    await userEvent.click(createTaskDrawerButton);

    const drawerTitle = screen.getByRole("heading", { name: /nova tarefa/i });
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

    const saveButton = screen.getByRole("button", { name: /confirmar envio/i });

    await userEvent.click(saveButton);

    expect(await screen.findByText(mockedTask.title)).toBeInTheDocument();
    expect(
      await screen.findByText(formatDate(mockedTask.due_date))
    ).toBeInTheDocument();
    expect(
      await screen.findByText(statusLabels[mockedTask.status])
    ).toBeInTheDocument();
    expect(
      await screen.findByText(prioritiesLabels[mockedTask.priority])
    ).toBeInTheDocument();
  });

  it("Should edit task", async () => {
    const mockedTask: Task = {
      id: "task-id",
      title: "title",
      due_date: "2024-11-19",
      status: TasksStatus.TODO,
      priority: TasksPriorities.LOW,
      description: "description",
    };

    const getResponse = {
      first: 1,
      prev: null,
      next: null,
      last: 1,
      pages: 1,
      items: 1,
      data: [mockedTask],
    };

    const updatedResponse = {
      first: 1,
      prev: null,
      next: null,
      last: 1,
      pages: 1,
      items: 1,
      data: [mockedTask],
    };

    let isFirstGet = true;

    server.use(
      http.get(`${API_URL}/tasks`, () => {
        if (isFirstGet) {
          isFirstGet = false;
          return HttpResponse.json(getResponse);
        } else {
          return HttpResponse.json(updatedResponse);
        }
      }),
      http.put(`${API_URL}/tasks`, async ({ request }) => {
        const body = await request.json();
        console.log("POST request body:", body);
        return HttpResponse.json(mockedTask);
      })
    );

    renderComponent();
    const taskTitle = await screen.findByText(mockedTask.title);
    expect(taskTitle).toBeVisible();
    const editButton = screen.getByRole("button", { name: "Editar task" });
    await userEvent.click(editButton);
    const drawerTitle = screen.getByRole("heading", { name: /nova tarefa/i });
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

  it("Should delete task", async () => {
    const mockedTask: Task = {
      id: "task-id",
      title: "title",
      due_date: "2024-11-19",
      status: TasksStatus.TODO,
      priority: TasksPriorities.LOW,
      description: "description",
    };

    const getResponse = {
      first: 1,
      prev: null,
      next: null,
      last: 1,
      pages: 1,
      items: 1,
      data: [mockedTask],
    };

    const updatedResponse = {
      first: 1,
      prev: null,
      next: null,
      last: 0,
      pages: 0,
      items: 0,
      data: [],
    };

    let isFirstGet = true;

    server.use(
      http.get(`${API_URL}/tasks`, () => {
        if (isFirstGet) {
          isFirstGet = false;
          return HttpResponse.json(getResponse);
        } else {
          return HttpResponse.json(updatedResponse);
        }
      }),
      http.delete(`${API_URL}/tasks/task-id`, async () => {
        return HttpResponse.json(mockedTask);
      })
    );

    renderComponent();
    const taskTitle = await screen.findByText(mockedTask.title);
    expect(taskTitle).toBeVisible();
    const deleteButton = screen.getByRole("button", {
      name: "Deletar tarefa",
    });

    await userEvent.click(deleteButton);

    const confirmDeleteButton = screen.getByRole("button", {
      name: "Confirmar deleção",
    });
    screen.debug(confirmDeleteButton);
    await userEvent.click(confirmDeleteButton);

    const emptyMessage = await screen.findByText(EMPTY_TASKS_MESSAGE);
    expect(emptyMessage).toBeVisible();
  });
});
