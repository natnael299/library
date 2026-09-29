import UserHeader from "@/sections/headers/UserHeader";
import type { User } from "@/types";
import { Outlet, useOutletContext } from "react-router-dom";

function UserLayout() {
  const user = useOutletContext<User>();
  return (
    <>
      <UserHeader />
      <main>
        <Outlet context={user} />
      </main>
    </>
  );
}

export default UserLayout;
