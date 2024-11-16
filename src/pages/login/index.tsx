import { HStack, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <HStack>
      <Heading>This is the Login Page</Heading>
      <Link to="dashboard">Redirect para dashboard</Link>
    </HStack>
  );
}
