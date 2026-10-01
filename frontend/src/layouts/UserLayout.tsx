import type { ProtectedRouteContext } from "@/ProtectedRoute";
import UserHeader from "@/sections/headers/UserHeader";
import { Outlet, useOutletContext } from "react-router-dom";

function UserLayout() {
  const context = useOutletContext<ProtectedRouteContext>();
  return (
    <>
      <UserHeader />
      <main>
        <Outlet context={context} />
      </main>
    </>
  );
}

export default UserLayout;
