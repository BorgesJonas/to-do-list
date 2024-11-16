import { useAuth0 } from "@auth0/auth0-react";
import { HStack, Heading } from "@chakra-ui/react";

import { Button } from "@/components/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export function Dashboard() {
  const { logout } = useAuth0();

  return (
    <HStack mt={8}>
      <Heading>This is the Dashboard Page</Heading>

      <Button
        variant="subtle"
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Surface
      </Button>
    </HStack>
  );
}
