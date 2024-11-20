import { useAuth0 } from "@auth0/auth0-react";
import { HStack, Heading, Flex, Text } from "@chakra-ui/react";

import { Button } from "@/components/button";
import { LiaClipboardListSolid } from "react-icons/lia";
export function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <HStack>
      <Flex
        as="main"
        height="100vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        p={4}
      >
        <Flex
          gap={8}
          flexDirection="column"
          width={["100%", "400px"]}
          textAlign="center"
        >
          <Flex alignItems="center" justifyContent="center">
            <Heading mr={4}>Bem vindo a TO DO LIST!</Heading>
            <LiaClipboardListSolid size={26} />
          </Flex>
          <Text>
            Seja para projetos pessoais ou profissionais, a TO DO LIST ajuda
            você a manter o foco, aumentar a produtividade e alcançar seus
            objetivos. Faça login e comece a organizar suas tarefas hoje mesmo e
            experimente uma nova forma de trabalhar!
          </Text>
          <Button
            aria-label="Entrar na plataforma"
            variant="solid"
            onClick={() =>
              loginWithRedirect({ appState: { returnTo: "/tasks" } })
            }
          >
            Log In
          </Button>
        </Flex>
      </Flex>
    </HStack>
  );
}
