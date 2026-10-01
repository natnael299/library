import { Outlet, useOutletContext } from "react-router-dom";
import AdminHeader from "@/sections/headers/AdminHeader";
import type { ProtectedRouteContext } from "@/ProtectedRoute";

function AdminLayout() {
  const context = useOutletContext<ProtectedRouteContext>();
  return (
    <>
      <AdminHeader />
      <main>
        <Outlet context={context} />
      </main>
    </>
  );
}

export default AdminLayout;
