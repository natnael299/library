import api from "@/types/api";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import type { Book } from "@/types";
import BookList from "./components/TableComp/BooksList";
import { Link } from "react-router-dom";

function Dashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalP, setTotalP] = useState<number>(0);
  const Limit = 15;
  const offset = (page - 1) * Limit;

  //handle page changes
  const changePage = (
    e: React.ChangeEvent<unknown, Element> | null,
    value: number,
  ) => {
    setPage(value);
  };

  //get all books at the start and update the fetch with search terms
  useEffect(() => {
    api
      .get(`/books?term=${searchTerm}&limit=${Limit}&offset=${offset}`)
      .then((res) => {
        if (res.status == 200) {
          setBooks(res.data.data);
          setTotalP(res.data.totalP);
          return;
        }
      })
      .catch(() => {});
  }, [searchTerm, offset]);

  //get books with search terms
  const getBooks = async () => {
    const res = await api.get(
      `/books?term=${searchTerm}&limit=${Limit}&offset=${offset}`,
    );
    if (res.status == 200) {
      setBooks(res.data.data);
      setTotalP(res.data.totalP);
      return;
    }
  };

  //delete a book
  const deleteBook = async (id: number) => {
    await api.delete(`/delete/${id}`);
  };

  return (
    <main>
      <div className="border-1 mt-2 px-4 border-black h-10 flex items-center gap-3 w-fit border rounded-sm">
        <Search />
        <input
          className="h-full w-full border-hidden outline-hidden"
          placeholder="Hae kirjan tai kirjoittajan nimi"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            getBooks();
          }}
          required
        />
      </div>
      {books.length > 0 ? (
        <BookList
          books={books}
          totalP={totalP}
          page={page}
          changePage={changePage}
          deleteBook={deleteBook}
        />
      ) : (
        <div>Book Not Found</div>
      )}
      <div>
        <Link to={`/addBook/book`}>Add a Book and a Copy</Link>
        <Link to={`/addBook/copy`}>Add a Copy</Link>
      </div>
    </main>
  );
}

export default Dashboard;
