import { useAuth0 } from "@auth0/auth0-react";
import { HStack, Heading } from "@chakra-ui/react";

import { Button } from "@/components/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export function Login() {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <HStack>
      <Heading>This is the Login Page</Heading>
      <Button
        aria-label="Entrar na plataforma"
        variant="subtle"
        onClick={() => loginWithRedirect({ appState: { returnTo: "/tasks" } })}
      >
        Log In
      </Button>
    </HStack>
  );
}
