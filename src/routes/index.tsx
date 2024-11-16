import { createBrowserRouter } from "react-router-dom";

import { Login } from "@/pages/login";
import { Dashboard } from "@/pages/dashboard";
import { AppLayout } from "@/components/app-layout";

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
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);
