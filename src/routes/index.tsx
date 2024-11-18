import { createBrowserRouter } from "react-router-dom";

import { Login } from "@/pages/login";
import { Tasks } from "@/pages/tasks";
import { AppLayout } from "@/components/app-layout";
import { TaskDetails } from "@/pages/task-details";

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
            element: <Tasks />,
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
