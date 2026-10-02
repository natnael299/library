import api from "@/api";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { ProtectedRouteContext } from "@/ProtectedRoute";

function Profile() {
  const [profile, setProfile] = useState({
    email: "",
    username: "",
    debt: "",
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
    <div className="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs mt-10 ml-10">
      <form action="#" onSubmit={updateInfo}>
        <h5 className="text-xl font-semibold text-heading mb-6 ml-20">
          Update your info
        </h5>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="example@company.com"
            value={profile.email}
            onChange={(e) => {
              setProfile({ ...profile, email: e.target.value });
            }}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Your username
          </label>
          <input
            type="username"
            id="username"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="username"
            onChange={(e) => {
              setProfile({ ...profile, username: e.target.value });
            }}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="debt"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Your debt
          </label>
          <input
            type="debt"
            id="debt"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="0.00€"
            required
            value={profile.debt}
            disabled
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[335px]"
        >
          Update Your Info
        </button>

        {/* Logout */}
        <button
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded w-[335px]"
          onClick={logOut}
        >
          Logout
        </button>
        {message && <p>{message}</p>}
        {err && <p>{err}</p>}
      </form>
    </div>
  );
}

export default Profile;
