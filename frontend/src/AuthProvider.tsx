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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        setUser(res.data.user);
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, setUser]);

  return (
    <AuthContext
      value={{ user, setUser, authenticated, setAuthenticated, loading }}
    >
      {children}
    </AuthContext>
  );
}

export default AuthProvider;
