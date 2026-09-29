import api from "@/api";
import type { User } from "@/types";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function AdminProfile() {
  const [profile, setProfile] = useState({
    email: "",
    name: "",
    role: "",
  });
  const user = useOutletContext<User>();
  const id = user.userId;

  useEffect(() => {
    api.get("/profile/" + id).then((res) => {
      if (res.status === 200) {
        setProfile(res.data.data);
      }
    });
  }, [id]);

  return (
    <div className="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs mt-10 ml-10">
      <div>
        <h5 className="text-xl font-semibold text-heading mb-6">Your Info</h5>
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
            disabled
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
            value={profile.name}
            onChange={(e) => {
              setProfile({ ...profile, name: e.target.value });
            }}
            required
            disabled
          />
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
