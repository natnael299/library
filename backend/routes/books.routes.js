import { Router } from "express";
import db from "../config/db.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = Router();

// Search books by title or writer.
router.get("/books", async (req, res) => {
  const term = req.query.term || "";
  const limit = Number(req.query.limit) || 15;
  const offset = Number(req.query.offset) || 0;

  try {
    const sql = `
      SELECT
        books.id,
        books.title,
        books.writer,
        books.publishing_date,
        COUNT(book_copies.id) AS total_copies,
        SUM(book_copies.borrowed = 0) AS available_copies
      FROM library.books
      LEFT JOIN library.book_copies ON books.id = book_copies.book_id
      WHERE books.title LIKE ? OR books.writer LIKE ?
      GROUP BY books.id, books.title, books.writer, books.publishing_date
      ORDER BY books.id
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(sql, [
      `%${term}%`,
      `%${term}%`,
      limit,
      offset,
    ]);
    const [totalCounts] = await db.query(
      `SELECT COUNT(*) AS total FROM library.books
       WHERE title LIKE ? OR writer LIKE ?`,
      [`%${term}%`, `%${term}%`],
    );

    return res.status(200).json({
      data: rows,
      totalP: Math.ceil(totalCounts[0].total / limit),
    });
  } catch (error) {
    console.error("GET /books failed:", error);
    return res.status(500).json({ message: "Could not fetch books" });
  }
});

// Add a book and its first copy.
router.post("/book", async (req, res) => {
  const { isbn, title, publishing_date, writer } = req.body;

  try {
    await db.beginTransaction();
    const [add] = await db.query(
      "INSERT INTO books (isbn, title, publishing_date, writer) VALUES (?, ?, ?, ?)",
      [isbn, title, publishing_date, writer],
    );
    await db.query(
      "INSERT INTO book_copies (book_id, borrowed) VALUES (?, ?)",
      [add.insertId, 0],
    );
    await db.commit();

    return res.status(201).json({ message: "Success" });
  } catch (error) {
    await db.rollback();
    return res.status(500).json({ message: "error" });
  }
});

// Add another copy of a book.
router.post("/bookCopy", async (req, res) => {
  const { book_id, borrowed } = req.body;

  try {
    await db.query(
      "INSERT INTO book_copies (book_id, borrowed) VALUES (?, ?)",
      [book_id, borrowed],
    );
    return res.status(201).json({ message: "Success" });
  } catch {
    return res.status(500).json({ message: "error" });
  }
});

// Delete a book.
router.delete("/delete", async (req, res) => {
  const { book_id } = req.body;

  try {
    await db.query("DELETE FROM books WHERE id = ?", [book_id]);
    return res.status(200).json({ message: "deleted successfull" });
  } catch {
    return res.status(500).json({ message: "error" });
  }
});

export default router;
