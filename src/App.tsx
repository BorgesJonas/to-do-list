import { RouterProvider } from "react-router-dom";

import { routes } from "@/routes";
import { Toaster } from "@/components/toaster";

export function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}
