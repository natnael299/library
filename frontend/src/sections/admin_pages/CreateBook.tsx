import api from "@/types/api";
import type React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function CreateBook() {
  const { type } = useParams();
  const [book, setBook] = useState({
    isbn: 0,
    title: "",
    publishing_date: "",
    writer: "",
  });
  const [msg, setMsg] = useState("");

  const [bookCopy, setBookCopy] = useState({
    book_id: 0,
    borrowed: 0,
  });

  const addFun: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (type == "book") {
      try {
        const res = await api.post(`/book`, book);
        if (res.status == 201) {
          setMsg("Error while adding the book!!");
        }
      } catch (err) {
        setMsg("Book added Successfully");
        console.log(err);
      }
    } else {
      try {
        const res = await api.post(`/bookCopy`, bookCopy);
        if (res.status == 201) {
          setMsg("Copy added SucessFully!!");
        }
      } catch (err) {
        setMsg("Error while adding the book copy!!");
        console.log(err);
      }
    }
  };
  return (
    <main>
      {type == "book" ? (
        <form onSubmit={addFun}>
          <h1>Add A new Book</h1>
          <div className="mb-4">
            <label
              htmlFor="isbn"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Book ISBN
            </label>
            <input
              name="number"
              type="number"
              id="isbn"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="99449595"
              onChange={(e) => {
                setBook({ ...book, isbn: Number(e.target.value) });
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Book Title
            </label>
            <input
              name="title"
              type="title"
              id="title"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="99449595"
              onChange={(e) => {
                setBook({ ...book, title: e.target.value });
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Book Release Date
            </label>
            <input
              name="date"
              type="datetime"
              id="date"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="99449595"
              onChange={(e) => {
                setBook({ ...book, publishing_date: e.target.value });
              }}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="writer"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Book Writer
            </label>
            <input
              name="writer"
              type="writer"
              id="writer"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="99449595"
              onChange={(e) => {
                setBook({ ...book, writer: e.target.value });
              }}
              required
            />
          </div>
          <button type="submit">Add Book</button>
          {msg && type == "book" && <div>{msg}</div>}
        </form>
      ) : (
        <form onSubmit={addFun}>
          <h1>Add A new Book Copy</h1>
          <div className="mb-4">
            <label
              htmlFor="book_id"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Book Id
            </label>
            <input
              type="book_id"
              name="book_id"
              id="book_id"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="username"
              onChange={(e) => {
                setBookCopy({ ...bookCopy, book_id: Number(e.target.value) });
              }}
              required
            />
          </div>
          <button type="submit">Add a book copy</button>
          {msg && type == "copy" && <div>{msg}</div>}
        </form>
      )}
    </main>
  );
}

export default CreateBook;
