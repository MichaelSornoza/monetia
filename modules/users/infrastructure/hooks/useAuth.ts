"use client";

import { signOut, useSession } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: !!session?.user,
    logout: () => signOut({ callbackUrl: "/auth/signin" }),
  };
};
