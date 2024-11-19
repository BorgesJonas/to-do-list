import { Outlet } from "react-router-dom";
import { Header } from "./components/header";

export function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
