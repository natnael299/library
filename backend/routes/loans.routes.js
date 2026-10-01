import { Router } from "express";
import db from "../config/db.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = Router();

// Record a book return.
router.patch("/loanStatus/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE borrowings SET return_date = ? WHERE id = ?";

  try {
    await db.query(sql, [new Date(), id]);
    return res.status(200).json({ message: "success" });
  } catch {
    return res.status(500).json({ message: "Error!!" });
  }
});

// Get a user's loans.
router.get("/loans/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT borrowings.id, borrowings.reservation_date, borrowings.due_date,
      borrowings.return_date, books.title, books.writer
    FROM borrowings
    JOIN books ON books.id = borrowings.book_id
    WHERE borrowings.user_id = ?
  `;

  try {
    const [rows] = await db.query(sql, [id]);
    if (rows.length === 0) {
      return res.status(200).json({ message: "Empty", data: [] });
    }
    return res.status(200).json({ data: rows });
  } catch {
    return res.status(500).json({ message: "Could not fetch loans" });
  }
});

// Update a user's debt.
router.patch("/debt/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  try {
    await db.query("UPDATE users SET debt = ? WHERE id = ?", [value, id]);
    return res.status(200).json({ message: "success" });
  } catch {
    return res.status(500).json({ message: "something went" });
  }
});

// Loan an available copy of a book.
router.put("/loan", async (req, res) => {
  const { id, book_id } = req.body;

  try {
    await db.beginTransaction();
    const [rows] = await db.query(
      `SELECT id FROM book_copies
       WHERE book_id = ? AND borrowed = 0
       LIMIT 1 FOR UPDATE`,
      [book_id],
    );

    if (rows.length === 0) {
      await db.rollback();
      return res.status(400).json({ message: "No copies available" });
    }

    const copyId = rows[0].id;
    await db.query(
      `INSERT INTO borrowings (user_id, book_id, book_copy_id)
       VALUES (?, ?, ?)`,
      [id, book_id, copyId],
    );
    await db.query("UPDATE book_copies SET borrowed = 1 WHERE id = ?", [
      copyId,
    ]);
    await db.commit();

    return res.status(200).json({ message: "Success" });
  } catch {
    await db.rollback();
    return res.status(500).json({ message: "Error" });
  }
});

export default router;
