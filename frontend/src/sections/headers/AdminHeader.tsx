import logo from "@/assets/logo.png";
import profile from "@/assets/profile.png";
import { Link } from "react-router-dom";

function AdminHeader() {
  const links = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "users",
      link: "/action/user",
    },
    {
      name: "admins",
      link: "/action/admin",
    },
    {
      name: <img src={profile} className="h-14" />,
      link: "/admin/profile",
    },
  ];
  return (
    <header className="flex items-center justify-between px-1 w-full border-b-2 bg-black text-white">
      <div className="flex items-center text-xl">
        <img src={logo} className="h-20" />
        <h2>Library</h2>
      </div>
      <div className="flex items-center gap-2">
        {links.map((l) => (
          <Link to={l.link} key={l.link}>
            {l.name}
          </Link>
        ))}
      </div>
    </header>
  );
}

export default AdminHeader;
