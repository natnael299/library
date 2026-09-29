import type { LoansType } from "@/types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import type { Dispatch, SetStateAction } from "react";

type LoanHistoryProps = {
  loans: LoansType[];
  loanStatusMsg: string | null;
  ChangeLoanStatus: (id: number) => void;
  setLoanStatustMsg: Dispatch<SetStateAction<string | null>>;
};

function LoanHistory({
  loans,
  loanStatusMsg,
  ChangeLoanStatus,
  setLoanStatustMsg,
}: LoanHistoryProps) {
  return (
    <>
      {loans.length > 0 ? (
        <div>
          <h1>Users Booking History</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Writer</TableCell>
                  <TableCell align="right">Reservation Date</TableCell>
                  <TableCell align="right">Due Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loans.map((l) => (
                  <TableRow
                    key={l.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {l.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {l.writer}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {l.reservation_date}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {l.due_date}
                    </TableCell>
                    <TableCell align="right">
                      {l.return_date !== null ? (
                        <Button>Returned</Button>
                      ) : (
                        <Button>On Loan</Button>
                      )}
                    </TableCell>
                    {l.return_date !== null && (
                      <Button onClick={() => ChangeLoanStatus(l.id)}>
                        Mark As Returned
                      </Button>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Display a message on update */}
          <Snackbar
            open={loanStatusMsg !== null}
            autoHideDuration={3000}
            onClose={() => setLoanStatustMsg(null)}
            message={loanStatusMsg}
          />
        </div>
      ) : (
        <div>No Loan History!!</div>
      )}
    </>
  );
}

export default LoanHistory;
