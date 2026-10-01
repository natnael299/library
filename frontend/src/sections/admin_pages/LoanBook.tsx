import { useParams } from "react-router-dom";
import api from "@/types/api";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import type { Book } from "@/types";
import BooksList from "./components/TableComp/BooksList";

function LoanBook() {
  const { id } = useParams();
  const [borrowMsg, setBorrowMsg] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [totalP, setTotalP] = useState<number>(0);
  const [page, setPage] = useState(1);
  const Limit = 15;
  const offset = (page - 1) * Limit;

  //handle page changes
  const changePage = (
    _e: React.ChangeEvent<unknown, Element> | null,
    value: number,
  ) => {
    setPage(value);
  };

  //get all books at the start and update the fetch with search terms
  useEffect(() => {
    api.get(`/books?term=""&limit=${Limit}&offset=${offset}`).then((res) => {
      setBooks(res.data.data);
      setTotalP(res.data.totalP);
    });
  }, [offset]);

  //functionality to loan a book
  const loanBook = async (book_id: number) => {
    const res = await api.post("/loan", { id, book_id });
    if (res.status == 200) {
      setBorrowMsg("Successfully borrowed!!");
    }
  };

  return (
    <div>
      {books.length > 0 ? (
        <>
          <BooksList
            books={books}
            totalP={totalP}
            page={page}
            changePage={changePage}
            loanBook={loanBook}
          />

          {borrowMsg && (
            <Snackbar
              open={borrowMsg !== null}
              message={borrowMsg}
              onClose={() => setBorrowMsg(null)}
              autoHideDuration={3000}
            />
          )}
        </>
      ) : (
        <div>Book Not Found</div>
      )}
    </div>
  );
}

export default LoanBook;
