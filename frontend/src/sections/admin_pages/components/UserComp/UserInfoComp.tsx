import type { Dispatch, SetStateAction } from "react";
import type { User } from "@/sections/admin_pages/User";
type UserInfoCompProps = {
  userInfo: User;
  setUserInfo: Dispatch<SetStateAction<User>>;
  clearDebtMsg: string | null;
  ClearDebt: () => void;
  role: string | undefined;
};
function UserInfoComp({
  userInfo,
  setUserInfo,
  clearDebtMsg,
  ClearDebt,
  role,
}: UserInfoCompProps) {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
        Detailed User Info
      </div>
      <form className="py-4 px-6" action="" method="POST">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="username"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            value={userInfo.name}
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
            disabled
          />
        </div>

        {role == "user" && (
          <>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="debt"
              >
                Debt
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="debt"
                type="number"
                placeholder="0.00 €"
                value={userInfo.debt == null ? "" : userInfo.debt + " €"}
                disabled
              />
            </div>
            <div className="flex items-center justify-center mb-4">
              <button
                className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={ClearDebt}
              >
                Clear The Users Debt
              </button>
            </div>
            {clearDebtMsg && <p>{clearDebtMsg}</p>}
          </>
        )}
      </form>
    </div>
  );
}

export default UserInfoComp;
