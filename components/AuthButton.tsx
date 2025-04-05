"use client";

import { Button } from "@heroui/button";
import { useSession, signOut, signIn } from "next-auth/react";

export const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button color="warning" onPress={() => signOut()}>
        Sign out
      </Button>
    );
  }

  return (
    <Button color="primary" onPress={() => signIn()}>
      Sign In
    </Button>
  );
};
