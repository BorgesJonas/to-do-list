import { useAuth0 } from "@auth0/auth0-react";
import { Flex } from "@chakra-ui/react";

export function Header() {
  const { isLoading, user } = useAuth0();

  return (
    <Flex as="header" p={4} bg="#18181b" justifyContent="space-between">
      <p>Logo</p>
      {isLoading ? <p>Loading user</p> : <p>{user?.name}</p>}
    </Flex>
  );
}
