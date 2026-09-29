import { Outlet, useOutletContext } from "react-router-dom";
import AdminHeader from "@/sections/headers/AdminHeader";
import type { User } from "@/types";
function AdminLayout() {
  const user = useOutletContext<User>();
  return (
    <>
      <AdminHeader />
      <main>
        <Outlet context={user} />
      </main>
    </>
  );
}

export default AdminLayout;
