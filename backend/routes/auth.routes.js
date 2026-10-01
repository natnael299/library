import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../config/db.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = Router();
const jwtSecret = process.env.JWT_SECRET || "jwt_secret_key";

// Log in with an email and password.
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Account not found" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    const payload = {
      userId: user.id,
      name: user.name,
      role: user.role,
    };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
    res.cookie("token", token);

    return res.status(200).json({
      message: "log in successfull!!",
      role: user.role,
    });
  } catch {
    return res.status(500).json({ error: "Could not log in" });
  }
});

// Log out and clear the authentication cookie.
router.post("/logout", (_, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Successfully logged out!!" });
});

// Return the currently authenticated user.
router.get("/", isAuthenticated, (req, res) => {
  return res.status(200).json({
    message: "autorized",
    user: req.user,
  });
});

export default router;
