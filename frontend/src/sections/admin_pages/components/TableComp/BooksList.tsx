import Pagination from "@mui/material/Pagination";
import type { Book } from "@/types";
import type { ChangeEvent } from "react";

type BookListProps = {
  books: Book[];
  totalP: number;
  page: number;
  changePage: (event: ChangeEvent<unknown, Element>, page: number) => void;
  loanBook?: (n: number) => void;
  deleteBook?: (id: number) => void;
};

function BooksList({
  books,
  totalP,
  page,
  changePage,
  loanBook,
  deleteBook,
}: BookListProps) {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 my-4">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Writer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Release Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Available Copies
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Copies
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {books.map((b) => (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">{b.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{b.writer}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(b.publishing_date).toLocaleDateString("fi-FI")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {b.available_copies}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{b.total_copies}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {loanBook && (
                  <button
                    className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                    onClick={() => loanBook(b.id)}
                  >
                    Loan Book
                  </button>
                )}

                {deleteBook && (
                  <button
                    className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                    onClick={() => deleteBook(b.id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={totalP} page={page} onChange={changePage} />
    </>
  );
}

export default BooksList;
