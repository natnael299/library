import api from "@/types/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateUser from "./components/ActionComp/CreateUser";
import UsersList from "./components/ActionComp/UsersList";

type User = {
  id: string;
  name: string;
  email: string;
  debt?: number | null;
};

function Action() {
  //user or admin
  const { role } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [err, setErr] = useState<string | null>(null);
  const [createMsg, setCreateMsg] = useState<string | null>(null);
  const [totalP, setTotalP] = useState<number>(0);
  const Limit = 15;
  const offset = (page - 1) * Limit;

  useEffect(() => {
    api
      .get(`/users?limit=${Limit}&offset=${offset}&role=${role}`)
      .then((res) => {
        setUsers(res.data.data);
        setTotalP(res.data.pagination.totalP);
      })
      .catch(() => {
        setErr("Oops something went wrong!!");
      });
  }, [offset, role]);

  //handle page changes
  const changePage = (
    e: React.ChangeEvent<unknown, Element> | null,
    value: number,
  ) => {
    setPage(value);
  };

  //create a new user/admin
  const Create: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = {
      name: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      role: role,
      debt: role == "user" ? 0 : null,
    };
    api
      .post("/user", values)
      .then(() => {
        setCreateMsg("Creation Was Successfull!!");
      })
      .catch(() => {
        setCreateMsg("Creation Failed Try Again!!");
      });
  };

  return (
    <main>
      {/* Users List */}
      <UsersList
        users={users}
        role={role}
        totalP={totalP}
        page={page}
        changePage={changePage}
      />

      {/* Error Component */}
      {err && <div>Oops something went wrong!!</div>}

      {/* Create A New user/admin */}
      <CreateUser Create={Create} role={role} createMsg={createMsg} />
    </main>
  );
}

export default Action;
