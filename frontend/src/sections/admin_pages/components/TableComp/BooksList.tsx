import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import type { Book } from "@/types";
import Button from "@mui/material/Button";
import type { ChangeEvent } from "react";

type BookListProps = {
  books: Book[];
  totalP: number;
  page: number;
  changePage: (event: ChangeEvent<unknown, Element>, page: number) => void;
  loanBook?: (n: number) => void;
  deleteBook?: (id: number) => void;
};

function BooksList({
  books,
  totalP,
  page,
  changePage,
  loanBook,
}: BookListProps) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Writer</TableCell>
              <TableCell align="right">Release Date</TableCell>
              <TableCell align="right">Available Copies</TableCell>
              <TableCell align="right">Total Copies</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((b) => (
              <TableRow
                key={b.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {b.title}
                </TableCell>
                <TableCell align="right">{b.writer}</TableCell>
                <TableCell align="right">{b.publishing_date}</TableCell>
                <TableCell align="right">{b.available_copies}</TableCell>
                <TableCell align="right">{b.total_copies}</TableCell>
                <TableCell align="right">
                  {loanBook && (
                    <Button onClick={() => loanBook(b.id)}>Loan Book</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={totalP} page={page} onChange={changePage} />
    </>
  );
}

export default BooksList;
