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
      <button
        onClick={() => setOpenDialog(true)}
        className="bg-red-500 text-white p-1 mt-5 ml-4"
      >
        Remove the users account...?
      </button>

      <Dialog
        open={openDialog}
        className="inset-0 m-0 h-full w-full max-h-none max-w-none items-center justify-center border-0 bg-transparent p-0 "
      >
        <div className="w-full max-w-md bg-white p-6 shadow-lg">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
            data-modal-hide="popup-modal"
            onClick={() => setOpenDialog(false)}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>
          <svg
            className="mx-auto mb-4 text-fg-disabled w-12 h-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p className="text-center">
            Are You Sure You Want To Delete Selected Account from the
            database...?
          </p>
          <div className="flex items-center space-x-8 justify-center mt-5">
            <Button
              onClick={() => setOpenDialog(false)}
              sx={{
                backgroundColor: "green",
                marginRight: "25px",
                color: "white",
              }}
            >
              No, Return
            </Button>
            <Button
              onClick={deleteAccount}
              sx={{
                backgroundColor: "red",
                color: "white",
              }}
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default DeleteAccount;
