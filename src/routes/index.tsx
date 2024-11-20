import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/components/app-layout";
import { AuthValidator } from "@/components/auth-validator";

export const routes = createBrowserRouter([
  {
    children: [
      {
        element: <AuthValidator />,
        children: [
          {
            path: "/",
            lazy: async () => {
              const { Login } = await import("../pages/login");
              return { Component: Login };
            },
          },
          {
            element: <AppLayout />,
            lazy: async () => {
              const { AppLayout } = await import("../components/app-layout");
              return { Component: AppLayout };
            },
            children: [
              {
                path: "/tasks",
                lazy: async () => {
                  const { TasksList } = await import(
                    "../pages/tasks/tasks-list"
                  );
                  return { Component: TasksList };
                },
              },
              {
                path: "/tasks/:id",
                lazy: async () => {
                  const { TaskDetails } = await import(
                    "../pages/tasks/task-details"
                  );
                  return { Component: TaskDetails };
                },
              },
            ],
          },
        ],
      },
    ],
  },
]);
