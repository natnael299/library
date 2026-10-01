import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "jwt_secret_key";

export function isAuthenticated(req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "not authenticated" });
  }

  try {
    req.user = jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ message: "invalid token" });
  }
}
