import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
          <h1>{role}'s List</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  {role == "user" && <TableCell align="right">Debt</TableCell>}
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow
                    key={u.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {u.id}
                    </TableCell>
                    <TableCell align="right">{u.name}</TableCell>
                    <TableCell align="right">{u.email}</TableCell>
                    {role == "user" && (
                      <TableCell align="right">{u.debt} €</TableCell>
                    )}

                    <TableCell align="right">
                      <Link to={`/ind/${u.id}/${role}`}>
                        Detailed {role}'s Info
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination count={totalP} page={page} onChange={changePage} />
        </>
      ) : (
        <div>No user found!!</div>
      )}
    </>
  );
}

export default UsersList;
