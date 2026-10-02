import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import booksRoutes from "./routes/books.routes.js";
import loansRoutes from "./routes/loans.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

// Keep the existing endpoint URLs while grouping handlers by feature.
app.use(authRoutes);
app.use(booksRoutes);
app.use(loansRoutes);
app.use(profileRoutes);
app.use(usersRoutes);

app.listen(process.env.PORT, () => {
  console.log(`The app is running on port ${process.env.PORT}.`);
});
