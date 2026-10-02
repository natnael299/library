import type { LoansType } from "@/types/types";
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
          <h1 className="text-2xl my-8 text-center">Users Booking History</h1>
          <table className="w-full border-collapse border border-blue-500 max-w-3xl my-4 mx-auto">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Writer</th>
                <th className="py-2 px-4 text-left">Reservation Date</th>
                <th className="py-2 px-4 text-left">Due Date</th>
                <th className="py-2 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {loans.map((l) => (
                <tr className="bg-white border-b border-blue-500" key={l.id}>
                  <td className="py-2 px-4">{l.title}</td>
                  <td className="py-2 px-4">{l.writer}</td>
                  <td className="py-2 px-4">
                    {new Date(l.reservation_date).toLocaleDateString("fi-FI")}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(l.due_date).toLocaleDateString("fi-FI")}
                  </td>
                  <td className="py-2 px-4">
                    {l.return_date == null ? (
                      <button className="bg-red-500 text-white p-2">
                        On Loan
                      </button>
                    ) : (
                      <button className="bg-green-500 text-white p-2">
                        Returned
                      </button>
                    )}
                  </td>
                  {l.return_date == null && (
                    <td className="py-2 px-4">
                      <button
                        onClick={() => ChangeLoanStatus(l.id)}
                        className="bg-blue-500 text-white p-2"
                      >
                        Mark As Returned
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

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
