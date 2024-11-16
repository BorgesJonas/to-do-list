import { HStack, IconButton } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineLogout } from "react-icons/ai";

import { Avatar } from "@/components/avatar";
import { Skeleton, SkeletonCircle } from "@/components/skeleton";
import { Tooltip } from "@/components/tooltip";

export function Actions() {
  const { isLoading, user, logout } = useAuth0();

  return (
    <HStack gap={4}>
      {isLoading ? (
        <>
          <Skeleton height={4} width={200} />
          <SkeletonCircle size={8} />
        </>
      ) : (
        <>
          <Tooltip content="Sair">
            <IconButton
              variant="ghost"
              aria-label="Sair"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              <AiOutlineLogout />
            </IconButton>
          </Tooltip>
          <p>{user?.email}</p>
          <Avatar size="xs" name="Logo" src={user?.picture} />
        </>
      )}
    </HStack>
  );
}
