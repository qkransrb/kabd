"use client";

import { useEffect } from "react";

import { isAuthenticated } from "@/actions/auth-actions";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();

      if (!authenticated) {
        window.localStorage.removeItem("kabd_user");
      }
    };

    checkAuth();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
