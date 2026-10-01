import { useEffect, useState } from "react";
import api from "@/types/api";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useOutletContext } from "react-router-dom";
import type { Book } from "@/types";
import Snackbar from "@mui/material/Snackbar";
import Pagination from "@mui/material/Pagination";
import type { ProtectedRouteContext } from "@/ProtectedRoute";

function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [totalP, setTotalPage] = useState(1);
  const [borrowMsg, setBorrowMsg] = useState<string | null>(null);
  const { user } = useOutletContext<ProtectedRouteContext>();
  const offset = (page - 1) * 15;

  //get all the Books at first
  useEffect(() => {
    api
      .get(`/books?term=${searchTerm}&limit=${15}&offset=${offset}`)
      .then((res) => {
        if (res.status == 200) {
          setBooks(res.data.data);
          setTotalPage(res.data.totalP);
          return;
        }
      })
      .catch(() => {
        setErr("Error while fetching books!!");
      });
  }, [searchTerm, offset]);

  //get all the books
  const getBooks = async () => {
    const res = await api.get(
      `/books?term=${searchTerm}&limit=${15}&offset=${offset}`,
    );
    if (res.status == 200) {
      setBooks(res.data.data);
      setTotalPage(res.data.totalP);
      return;
    }
    setErr("an error has occurred!!");
  };

  //loan a book
  const borrowBook = async (book_id: number) => {
    const id = user.userId;
    const res = await api.post("/loan", {
      id,
      book_id,
    });
    if (res.status == 200) {
      setBorrowMsg("Successfully borrowed!!");
    }
  };

  //change pages
  const changePage = (
    _e: React.ChangeEvent<unknown, Element> | null,
    value: number,
  ) => {
    setPage(value);
  };

  return (
    <main>
      <h1 className="text-3xl my-5 ml-5">
        Tervetuloa järjestelmän{" "}
        <span className="text-blue-800">{user.name.split(" ")[0]}</span>
      </h1>

      <div className="max-w-md ml-2">
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

      <div className="my-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.length > 0 ? (
          <>
            {books.map((b) => (
              <Card
                key={b.id}
                className="h-full rounded-lg border border-border/70 shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <CardHeader className="gap-1.5 pb-2">
                  <CardTitle className="text-lg font-semibold leading-snug">
                    Title: {b.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Writer: {b.writer}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center justify-between gap-3">
                  <Label className="text-xs text-muted-foreground">
                    published on{" "}
                    {new Date(b.publishing_date).toLocaleDateString("fi-FI")}
                  </Label>
                  <Label
                    className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                      b.available_copies > 0
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {b.available_copies}/{b.total_copies} Available
                  </Label>
                </CardContent>
                <CardFooter className="border-t border-border/60 bg-muted/30">
                  <Button
                    className="w-full cursor-pointer shadow-sm bg-blue-500 text-white hover:bg-primary/90"
                    disabled={b.available_copies == 0}
                    onClick={() => borrowBook(b.id)}
                  >
                    Borrow
                  </Button>
                </CardFooter>
              </Card>
            ))}
            <Pagination count={totalP} page={page} onChange={changePage} />
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
      {err && <p>No Books Found</p>}
    </main>
  );
}

export default Home;
