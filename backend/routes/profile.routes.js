import { Router } from "express";
import db from "../config/db.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = Router();

// Get a user's profile.
router.get("/profile/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT email, name, debt FROM users WHERE id = ?",
      [id],
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ data: rows[0] });
  } catch {
    return res.status(500).json({ message: "Could not fetch profile" });
  }
});

// Update a user's profile.
router.put("/profile/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { email, username } = req.body;

  try {
    await db.query("UPDATE users SET email = ?, name = ? WHERE id = ?", [
      email,
      username,
      id,
    ]);
    return res.status(200).json({ message: "Successfully updated!!" });
  } catch {
    return res.status(500).json({
      message: "Oops something went wrong, try again!!",
    });
  }
});

export default router;
