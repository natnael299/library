import api from "@/api";
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
        <form
          className="max-w-md mx-auto bg-gray-100 shadow-md rounded-md overflow-hidden mt-16"
          onSubmit={addFun}
        >
          <div className="bg-blue-600 text-white p-4 flex justify-between">
            <div className="font-bold text-lg">Add A New Book</div>
            <div className="text-lg">
              <i className="fab fa-cc-visa"></i>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="isbn"
              >
                Book ISBN
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="card_number"
                type="number"
                name="isbn"
                placeholder="7819 920 030"
                onChange={(e) => {
                  setBook({ ...book, isbn: Number(e.target.value) });
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="title"
              >
                Book Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="title"
                id="title"
                type="text"
                placeholder="John Doe"
                onChange={(e) => {
                  setBook({ ...book, title: e.target.value });
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="date"
              >
                Book Release Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="date"
                id="date"
                type="datetime"
                placeholder="01.02.2010"
                onChange={(e) => {
                  setBook({ ...book, publishing_date: e.target.value });
                }}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="writer"
              >
                Book Writer
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="writer"
                id="writer"
                type="text"
                placeholder="Kevin De bruyne"
                onChange={(e) => {
                  setBook({ ...book, writer: e.target.value });
                }}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Add Book
            </button>
          </div>
          {msg && type == "book" && <div>{msg}</div>}
        </form>
      ) : (
        <form
          className="max-w-md mx-auto bg-gray-100 shadow-md rounded-md overflow-hidden mt-16"
          onSubmit={addFun}
        >
          <div className="bg-blue-600 text-white p-4 flex justify-between">
            <div className="font-bold text-lg">A New Book Copy</div>
            <div className="text-lg">
              <i className="fab fa-cc-visa"></i>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="book_id"
              >
                Book Id
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="book_id"
                type="number"
                name="book_id"
                placeholder="eg. 10"
                onChange={(e) => {
                  setBookCopy({
                    ...bookCopy,
                    book_id: Number(e.target.value),
                  });
                }}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Add a book copy
            </button>
          </div>
          {msg && type == "copy" && <div>{msg}</div>}
        </form>
      )}
    </main>
  );
}

export default CreateBook;
