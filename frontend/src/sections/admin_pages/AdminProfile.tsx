import api from "@/api";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { ProtectedRouteContext } from "@/ProtectedRoute";

function AdminProfile() {
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    role: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, setUser } = useOutletContext<ProtectedRouteContext>();
  const id = user.userId;

  useEffect(() => {
    api.get("/profile/" + id).then((res) => {
      if (res.status === 200) {
        setProfile(res.data.data);
      }
    });
  }, [id]);

  //update functionality
  const updateInfo: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await api.put("/profile/" + user.userId, profile);
    if (res.status === 200) {
      setMessage("Successfully Updated!!");
    } else {
      setErr("Error while updating, try again!!");
    }
  };

  //logout functionality
  const logOut = async () => {
    const res = await api.post(`/logout`);
    if (res.status == 200) {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <>
      <form className="max-w-sm mx-auto mt-14" action="#" onSubmit={updateInfo}>
        <h5 className="text-xl font-semibold text-heading mb-6 ml-20">
          Update your info
        </h5>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
            placeholder="name@example.com"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Your username
          </label>
          <input
            type="username"
            id="username"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
            placeholder="••••••••"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            required
          />
        </div>

        <div className="flex items-center space-x-8 justify-center">
          <button
            type="submit"
            className="text-white bg-blue-500 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Submit
          </button>

          {/* Logout */}
          <button
            className="text-white bg-red-500 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            onClick={logOut}
          >
            Logout
          </button>
        </div>
        {message && <p>{message}</p>}
        {err && <p>{err}</p>}
      </form>
    </>
  );
}

export default AdminProfile;
