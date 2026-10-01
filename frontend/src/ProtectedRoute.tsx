import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import api from "./types/api";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { User } from "./types";

export type ProtectedRouteContext = {
  user: User;
  setUser: Dispatch<SetStateAction<User | null>>;
};

function ProtectedRoute() {
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState<null | boolean>(null);
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
  }, [user?.role]);

  //redirect to login page
  if (authenticated == null) {
    return <div>Loading ...</div>;
  }

  //redirect to login page
  if (authenticated == false) {
    return <Navigate to="/login" replace />;
  }

  //redirect an already logged in user to the admin page
  if (user?.role === "admin" && location.pathname === "/") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet context={{ user, setUser }} />;
}

export default ProtectedRoute;
