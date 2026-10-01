import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import type { User } from "../../User";

type UsersListProps = {
  users: User[];
  role: string | undefined;
  totalP: number;
  page: number;
  changePage: (
    e: React.ChangeEvent<unknown, Element> | null,
    value: number,
  ) => void;
};

function UsersList({ users, role, totalP, page, changePage }: UsersListProps) {
  return (
    <>
      {users.length > 0 ? (
        <>
          <h1 className="text-2xl text-center my-4">{role}'s List</h1>
          <table className="w-full border-collapse border border-blue-500 max-w-3xl my-6 mx-auto">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4 text-left">Id</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                {role == "user" && (
                  <th className="py-2 px-4 text-left">Debt</th>
                )}
                <th className="py-2 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr className="bg-white border-b border-blue-500" key={u.id}>
                  <td className="py-2 px-4">{u.id}</td>
                  <td className="py-2 px-4">{u.name}</td>
                  <td className="py-2 px-4">{u.email}</td>
                  {role == "user" && <td className="py-2 px-4">{u.debt} €</td>}

                  <td className="py-2 px-4">
                    <Link to={`/ind/${u.id}/${role}`}>
                      Detailed {role}'s Info
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination count={totalP} page={page} onChange={changePage} />
        </>
      ) : (
        <div>No user found!!</div>
      )}
    </>
  );
}

export default UsersList;
