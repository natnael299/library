import type { Dispatch, SetStateAction } from "react";
import type { User } from "../User";
type UserInfoCompProps = {
  userInfo: User;
  setUserInfo: Dispatch<SetStateAction<User>>;
};
function UserInfoComp({ userInfo, setUserInfo }: UserInfoCompProps) {
  return (
    <>
      <h5 className="text-xl font-semibold text-heading mb-6">
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
          value={userInfo.email}
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
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
          value={userInfo.name}
          onChange={(e) => {
            setUserInfo({ ...userInfo, name: e.target.value });
          }}
          disabled
        />
      </div>
    </>
  );
}

export default UserInfoComp;
