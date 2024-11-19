import { createBrowserRouter } from "react-router-dom";

import { Login } from "@/pages/login";

import { AppLayout } from "@/components/app-layout";
import { TasksList } from "@/pages/tasks/tasks-list";
import { TaskDetails } from "@/pages/tasks/task-details";
import { AuthValidator } from "@/components/auth-validator";

export const routes = createBrowserRouter([
  {
    children: [
      {
        element: <AuthValidator />,
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
    ],
  },
]);
