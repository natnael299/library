import React, { useEffect, useState } from "react";
import api from "./api";
import { AuthContext } from "./auth";
import type { User } from "./types/types";

type AuthProvider = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProvider) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        setUser(res.data.user);
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, [user, setUser]);

  return (
    <AuthContext value={{ user, setUser, authenticated, setAuthenticated }}>
      {children}
    </AuthContext>
  );
}

export default AuthProvider;
