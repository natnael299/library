import logo from "@/assets/logo.png";
import profile from "@/assets/profile.png";
import { Link } from "react-router-dom";
function UserHeader() {
  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Loans",
      link: "/loans",
    },
    {
      name: <img src={profile} className="h-14" />,
      link: "/profile",
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

export default UserHeader;
