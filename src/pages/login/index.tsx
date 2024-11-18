import { useAuth0 } from "@auth0/auth0-react";
import { HStack, Heading } from "@chakra-ui/react";

import { Button } from "@/components/button";
export function Login() {
  const { loginWithRedirect } = useAuth0();
  return (
    <HStack>
      <Heading>This is the Login Page</Heading>
      <Button
        variant="subtle"
        onClick={() => loginWithRedirect({ appState: { returnTo: "/tasks" } })}
      >
        Log In
      </Button>
    </HStack>
  );
}
