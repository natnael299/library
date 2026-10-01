import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../config/db.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = Router();

// Fetch users by role.
router.get("/users", async (req, res) => {
  const role = req.query.role || "";
  const limit = Number(req.query.limit) || 15;
  const offset = Number(req.query.offset) || 0;

  try {
    const [rows] = await db.query(
      `SELECT id, name, email, debt FROM users
       WHERE role = ? LIMIT ? OFFSET ?`,
      [role, limit, offset],
    );
    const [totalCounts] = await db.query(
      "SELECT COUNT(*) AS total FROM users WHERE role = ?",
      [role],
    );

    if (rows.length === 0) {
      return res.status(200).json({ data: [] });
    }
    return res.status(200).json({
      data: rows,
      pagination: {
        total: totalCounts[0].total,
        totalP: Math.ceil(totalCounts[0].total / limit),
      },
    });
  } catch {
    return res.status(500).json({ message: "Could not fetch users" });
  }
});

// Create a user or admin.
router.post("/user", async (req, res) => {
  const { name, email, password, role, debt } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (name, email, password, debt, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashedPassword, debt, role],
    );
    return res.status(201).json({ message: "Success" });
  } catch {
    return res.status(500).json({ message: "Could not create user" });
  }
});

// Get a user by ID.
router.get("/user/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Not Found!!" });
    }
    return res.status(200).json({ data: rows[0] });
  } catch {
    return res.status(500).json({ message: "Could not fetch user" });
  }
});

// Delete a user by ID.
router.delete("/user/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    return res.status(200).json({ message: "deleted!!" });
  } catch {
    return res.status(500).json({ message: "error!!" });
  }
});

export default router;
