import { useEffect, useState } from "react";
import api from "@/api";
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
import type { User, Book } from "@/types";
import Snackbar from "@mui/material/Snackbar";
import Pagination from "@mui/material/Pagination";

function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [totalP, setTotalPage] = useState(1);
  const [borrowMsg, setBorrowMsg] = useState<string | null>(null);
  const user = useOutletContext<User>();
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
    e: React.ChangeEvent<unknown, Element> | null,
    value: number,
  ) => {
    setPage(value);
  };

  return (
    <main>
      <h1 className="text-3xl mt-5">Hae kirjoja</h1>
      <p className="text-xl my-1">
        Hae kirja nimen tai kirjoittajan perusteella.
      </p>
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

      <div className="my-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.length > 0 ? (
          <>
            {books.map((b) => (
              <Card key={b.id}>
                <CardHeader>
                  <CardTitle>Title: {b.title}</CardTitle>
                  <CardDescription>Writer: {b.writer}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-4">
                  <Label className="text-muted-foreground">
                    published on {b.publishing_date}
                  </Label>
                  <Label className="text-muted-foreground">
                    {b.available_copies}/{b.total_copies} Available
                  </Label>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full cursor-pointer hover:bg-primary/80"
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
