import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./components/header";

export function AppLayout() {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <>
      <Header />
      {isLoading ? <p>Loading</p> : <Outlet />}
    </>
  );
}
