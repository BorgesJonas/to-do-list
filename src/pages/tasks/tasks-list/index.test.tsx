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
import { prioritiesLabels, statusLabels } from "@/pages/tasks/common/consts";
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
      http.get(`${API_URL}/tasks`, () => {
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
      http.put(`${API_URL}/tasks`, async () => {
        return HttpResponse.json(mockedTask);
      })
    );

    renderComponent();

    const taskTitle = await screen.findByText(mockedTask.title);
    expect(taskTitle).toBeVisible();

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

    await userEvent.click(confirmDeleteButton);

    const emptyMessage = await screen.findByText(EMPTY_TASKS_MESSAGE);
    expect(emptyMessage).toBeVisible();
  });

  it("Should filter tasks", async () => {
    const mockedTasks: Task[] = [
      {
        id: "task-id",
        title: "First Task",
        due_date: "2024-11-19",
        status: TasksStatus.TODO,
        priority: TasksPriorities.LOW,
        description: "description",
      },
      {
        id: "task-id-2",
        title: "Second Task",
        due_date: "2024-11-19",
        status: TasksStatus.IN_PROGRESS,
        priority: TasksPriorities.LOW,
        description: "description",
      },
    ];

    const getResponse = {
      first: 1,
      prev: null,
      next: null,
      last: 1,
      pages: 1,
      items: 2,
      data: mockedTasks,
    };

    const filteredRespose = {
      first: 1,
      prev: null,
      next: null,
      last: 0,
      pages: 0,
      items: 0,
      data: [mockedTasks[1]],
    };

    let isFirstGet = true;

    server.use(
      http.get(`${API_URL}/tasks`, () => {
        if (isFirstGet) {
          isFirstGet = false;
          return HttpResponse.json(getResponse);
        } else {
          return HttpResponse.json(filteredRespose);
        }
      })
    );

    renderComponent();
    let firstTaskTitle: HTMLElement | null = await screen.findByText(
      mockedTasks[0].title
    );
    let secondTaskTitle = await screen.findByText(mockedTasks[1].title);
    expect(firstTaskTitle).toBeVisible();
    expect(secondTaskTitle).toBeVisible();

    const createTaskDrawerButton = screen.getByRole("button", {
      name: /filtrar tarefas/i,
    });
    await userEvent.click(createTaskDrawerButton);

    const drawerTitle = screen.getByRole("heading", { name: /filtros/i });
    expect(drawerTitle).toBeVisible();

    const statusSelect = screen.getByRole("combobox", {
      name: /status/i,
    });

    await userEvent.click(statusSelect);

    const statusOption = screen.getByRole("option", {
      name: statusLabels[TasksStatus.IN_PROGRESS],
    });

    expect(statusOption).toBeVisible();

    await userEvent.click(statusOption);

    const confirmFilter = screen.getByRole("button", { name: /filtrar/i });

    await userEvent.click(confirmFilter);

    firstTaskTitle = screen.queryByText(mockedTasks[0].title);
    secondTaskTitle = await screen.findByText(mockedTasks[1].title);

    expect(firstTaskTitle).not.toBeInTheDocument();
    expect(secondTaskTitle).toBeInTheDocument();
  });

  it("Should navigate to details page", async () => {
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

    server.use(
      http.get(`${API_URL}/tasks`, () => {
        return HttpResponse.json(getResponse);
      })
    );

    renderComponent();
    const taskTitle = await screen.findByText(mockedTask.title);
    expect(taskTitle).toBeVisible();

    const viewButton = screen.getByRole("button", {
      name: /visualizar tarefa/i,
    });
    await userEvent.click(viewButton);
    expect(mockNavigate).toHaveBeenCalledWith(`/tasks/${mockedTask.id}`);
  });
});
