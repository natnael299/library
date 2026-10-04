import api from "@/api";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import type { Book } from "@/types/types";
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
    _e: React.ChangeEvent<unknown, Element> | null,
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
      <div className="max-w-md ml-2 my-6">
        <label
          htmlFor="search"
          className="block mb-2.5 text-sm font-medium text-heading sr-only "
        >
          Kirjan tai Kirjotajan nimi
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none mr-4">
            <Search size={20} />
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
            placeholder=" Kirjan tai Kirjotajan nimi"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              getBooks();
            }}
            required
          />
        </div>
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

      <div className="space-x-4 my-6 ml-4">
        <Link
          to={`/addBook/book`}
          className="border-1 p-2 rounded-sm bg-green-800 text-white"
        >
          Add a Book and a Copy
        </Link>
        <Link
          to={`/addBook/copy`}
          className="border-1 p-2 rounded-sm bg-green-800 text-white"
        >
          Add a Copy
        </Link>
      </div>
    </main>
  );
}

export default Dashboard;
