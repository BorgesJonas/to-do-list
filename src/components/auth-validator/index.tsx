import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Spinner, Text } from "@chakra-ui/react";
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
    <>
      {isLoading ? (
        <Flex
          width="100%"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner data-testid="auth-loader" />
        </Flex>
      ) : (
        <Outlet />
      )}{" "}
    </>
  );
}
