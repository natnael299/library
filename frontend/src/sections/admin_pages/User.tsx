import api from "@/types/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { LoansType } from "@/types";
import LoanHistory from "./components/UserComp/LoanHistory";
import DeleteAccount from "./components/UserComp/DeleteAccount";
import UserInfoComp from "./components/UserComp/UserInfoComp";

export type User = {
  id: string;
  name: string;
  email: string;
  debt?: number | null;
};

function User() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<User>({
    id: "",
    name: "",
    email: "",
    debt: 0,
  });

  const [loans, setLoans] = useState<LoansType[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [clearDebtMsg, setClearDebtMsg] = useState<string | null>(null);
  const [loanStatusMsg, setLoanStatustMsg] = useState<string | null>(null);
  const { id, role } = useParams();

  //filter open loans
  const openLoans = loans.some((l) => l.return_date == null);
  //criterias for a deletable account
  const deletable: boolean = userInfo.debt == 0 && role == "user" && !openLoans;

  //fetch users info
  useEffect(() => {
    api
      .get(`/user/${id}`)
      .then((res) => {
        setUserInfo(res.data.data);
      })
      .catch(() => {});
  }, [id]);

  // fetch users borrowing info
  useEffect(() => {
    api.get(`/loans/${id}`).then((res) => {
      if (res.status == 200) {
        setLoans(res.data.data);
      }
    });
  }, [id]);

  //delete functionality
  const deleteAccount = () => {
    api.delete(`/user/${id}`).then(() => {
      navigate("/action/user");
      setOpenDialog(false);
    });
  };

  //clear the users debt
  const ClearDebt = () => {
    api
      .patch(`/debt/${id}`, { value: 0 })
      .then(() => {
        setClearDebtMsg("Debt Cleared!!");
      })
      .catch(() => {
        setClearDebtMsg("Unsuccesfull, try again!!");
      });
  };

  //change the status of a users loan
  const ChangeLoanStatus = (id: number) => {
    api
      .patch(`/loanStatus/${id}`)
      .then(() => {
        setLoanStatustMsg("Success!!");
      })
      .catch(() => {
        setLoanStatustMsg("Error!!");
      });
  };

  return (
    id && (
      <main>
        {/* Logged in users info */}
        <div>
          <UserInfoComp
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            clearDebtMsg={clearDebtMsg}
            ClearDebt={ClearDebt}
            role={role}
          />

          {role == "user" && (
            <LoanHistory
              loans={loans}
              loanStatusMsg={loanStatusMsg}
              ChangeLoanStatus={ChangeLoanStatus}
              setLoanStatustMsg={setLoanStatustMsg}
            />
          )}

          {deletable && (
            <DeleteAccount
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
              deleteAccount={deleteAccount}
            />
          )}
        </div>
      </main>
    )
  );
}

export default User;
