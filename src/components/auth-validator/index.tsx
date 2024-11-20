import { useAuth0 } from "@auth0/auth0-react";
import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export function AuthValidator() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }

    if (!isLoading && isAuthenticated) {
      if (location.pathname === "/") {
        navigate("/tasks");
      } else {
        navigate(location.pathname);
      }
    }
  }, [isLoading, isAuthenticated]);

  return (
    <>{isLoading ? <Text fontSize="xl">Carregando...</Text> : <Outlet />} </>
  );
}
