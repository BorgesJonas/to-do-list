import { createBrowserRouter } from "react-router-dom";

import { Login } from "@/pages/login";

import { AppLayout } from "@/components/app-layout";
import { TasksList } from "@/pages/tasks/tasks-list";
import { TaskDetails } from "@/pages/tasks/task-details";

export const routes = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: "/tasks",
            element: <TasksList />,
          },
          {
            path: "/tasks/:id",
            element: <TaskDetails />,
          },
        ],
      },
    ],
  },
]);
