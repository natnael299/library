import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth";

type ProtectedRouteProp = {
  allowedRole: "user" | "admin";
};

function ProtectedRoute({ allowedRole }: ProtectedRouteProp) {
  const { user, authenticated } = useAuth();

  //redirect unauthenticated access
  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  //redirect unauthorized access
  if (user?.role !== allowedRole) {
    return <Navigate to="/unauthorized" />;
  }

  //continue to selected destination
  if (authenticated && user?.role === allowedRole) {
    return <Outlet />;
  }
}

export default ProtectedRoute;
