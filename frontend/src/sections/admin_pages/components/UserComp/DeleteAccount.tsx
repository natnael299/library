import { type Dispatch, type SetStateAction } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

type DeleteAccountProps = {
  openDialog: boolean;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
  deleteAccount: () => void;
};

function DeleteAccount({
  openDialog,
  setOpenDialog,
  deleteAccount,
}: DeleteAccountProps) {
  return (
    <>
      <Button onClick={() => setOpenDialog(true)}>Delete Account</Button>

      <Dialog open={openDialog}>
        <p>Are You Sure You Want To Delete Selected Account</p>
        <Button onClick={() => setOpenDialog(false)}>No, Return</Button>
        <Button onClick={deleteAccount}>Yes, Delete</Button>
      </Dialog>
    </>
  );
}

export default DeleteAccount;
