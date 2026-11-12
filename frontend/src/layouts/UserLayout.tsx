import UserHeader from "@/sections/headers/UserHeader";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <>
      <UserHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default UserLayout;
