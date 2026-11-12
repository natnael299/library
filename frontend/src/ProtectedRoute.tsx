import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth";

type ProtectedRouteProp = {
  allowedRole: "user" | "admin";
};

function ProtectedRoute({ allowedRole }: ProtectedRouteProp) {
  const { user, authenticated } = useAuth();

  //redirect unauthorized access
  if (!authenticated) {
    return <Navigate to="/login" />;
  }
  //redirect unauthorized access
  if (authenticated && user?.role !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
