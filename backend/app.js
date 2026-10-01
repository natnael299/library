import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
//start the app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.DB_URL,
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

//create a connection with the db
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/**** api end-points ****/

const isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "not authenticated" });
  try {
    const payload = jwt.verify(token, "jwt_secret_key");
    if (!payload) res.status(401).json({ message: "invalid token" });
    req.user = payload;
    next();
  } catch (error) {
    res.status(500).json({ message: "error with the server" });
  }
};

//search a book by a search term
app.get("/books", async (req, res) => {
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
    LEFT JOIN library.book_copies
        ON books.id = book_copies.book_id

    WHERE (books.title LIKE ? OR books.writer LIKE ?)

    GROUP BY
        books.id,
        books.title,
        books.writer,
        books.publishing_date
    ORDER BY books.id
    LIMIT ? OFFSET ?
        `;

    const [rows] = await db.query(sql, [
      `%${term}%`,
      `%${term}%`,
      limit,
      offset,
    ]);

    //total
    const [totalCounts] = await db.query(
      `
    SELECT
    COUNT(*) AS total
    FROM library.books
    LEFT JOIN library.book_copies
        ON books.id = book_copies.book_id

    WHERE (books.title LIKE ? OR books.writer LIKE ?)
        `,
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

//add a book
app.post("/book", async (req, res) => {
  //add the book
  const { isbn, title, publishing_date, writer } = req.body;
  try {
    await db.beginTransaction();
    const [add] = await db.query(
      "INSERT INTO books (isbn, title, publishing_date, writer ) VALUES (?,?,?,?)",
      [isbn, title, publishing_date, writer],
    );

    //add the copy
    const book_id = add.insertId;
    await db.query(
      "INSERT INTO book_copies (book_id, borrowed) VALUES (?, ?)",
      [book_id, 0],
    );

    db.commit();

    res.status(201).json({
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
  }
});

//add a copy
app.post("/bookCopy", async (req, res) => {
  const { book_id, borrowed } = req.body;
  try {
    await db.query(
      "INSERT INTO book_copies (book_id, borrowed) VALUES (?, ?)",
      [book_id, borrowed],
    );
    res.status(201).json({
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
  }
});

//update the status of a books return
app.patch("/loanStatus/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const newDate = new Date();
  const sql = "UPDATE borrowings SET return_date=? WHERE id=?";
  try {
    await db.query(sql, [newDate, id]);
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error!!",
    });
  }
});

//get a users loan
app.get("/loans/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  const sql = `SELECT borrowings.id, borrowings.reservation_date, borrowings.due_date, borrowings.return_date, books.title, books.writer FROM borrowings JOIN books ON books.id= borrowings.book_id WHERE borrowings.user_id=?
  `;

  const [rows] = await db.query(sql, [id]);

  if (rows.length == 0) {
    return res.status(200).json({
      message: "Empty",
      data: [],
    });
  }

  return res.status(200).json({
    data: rows,
  });
});

//clear a users loan
app.patch("/debt/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  try {
    await db.query(
      `UPDATE users SET debt=? WHERE id=?
    `,
      [value, id],
    );
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: "something went",
    });
  }
});

//loan a book
app.put("/loan", async (req, res) => {
  const { id, book_id } = req.body;

  try {
    await db.beginTransaction();

    //fetch the book
    const sql = ` SELECT copy_id
FROM book_copies
WHERE book_id = ? AND borrowed = 0
LIMIT 1`;
    const [rows] = await db.query(sql, [book_id]);
    if (rows.length == 0) {
      return res.status(400).json({
        message: "No copies available",
      });
    }

    //borrow the book
    const copy_id = rows[0].copy_id;
    const insertSql = `INSERT INTO borrowing (user_id, book_id, copy_id)
       VALUES (?, ?)`;
    await db.query(insertSql, [id, book_id, copy_id]);

    //mark the book as borrowed
    const updateSql = "UPDATE book_copies SET borrowed = 1 WHERE id=?";
    await db.query(updateSql, [copy_id]);

    await db.commit();
    return res.status(200).json({
      message: "Success",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error",
    });
  }
});

//delete a book
app.delete("/delete", async (req, res) => {
  const { book_id } = req.body;
  try {
    await db.query("DELETE * from books WHERE id=?", [book_id]);
    res.status(200).json({
      message: "deleted successfull",
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
  }
});

//get a logged in users info
app.get("/profile/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  const sql = "SELECT email, name, debt FROM users WHERE id=?";
  const [rows] = await db.query(sql, [id]);
  return res.status(200).json({
    data: rows[0],
  });
});

//update a logged in users info
app.put("/profile/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { email, username } = req.body;

  try {
    const sql = "Update users set email=?, name=? WHERE id=?";
    await db.query(sql, [email, username, id]);

    return res.status(200).json({
      message: "Successfully updated!!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Oops something went wrong, try again!!",
    });
  }
});

//logout
app.post("/logout", async (_, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Successfully logged out!!",
  });
});

//login endpoint
app.post("/login", async (req, res) => {
  const sql = "SELECT * FROM users WHERE email=?";
  const { email, password } = req.body;

  //search for the user from db
  const [rows] = await db.query(sql, [email]);

  //check is the user is in the db or not
  if (rows.length == 0)
    return res.status(401).json({ error: "Account not found" });
  const user = rows[0];

  //check if the password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid Password" });

  const payload = {
    userId: user.id,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(payload, "jwt_secret_key", { expiresIn: "1h" });
  res.cookie("token", token);

  //return a sucess message
  return res.status(200).json({
    message: "log in successfull!!",
    role: user.role,
  });
});

//fetch users
app.get("/users", async (req, res) => {
  const role = req.query.role || "";
  const limit = Number(req.query.limit) || 15;
  const offset = Number(req.query.offset) || 0;

  const [rows] = await db.query(
    "SELECT users.id, users.name, users.email, users.debt FROM users WHERE role=? LIMIT ? OFFSET ?",
    [role, limit, offset],
  );

  const [totalCounts] = await db.query(
    "SELECT COUNT(*) AS total FROM users WHERE role=?",
    [role],
  );

  if (rows.length == 0) return res.status(200).json({ data: [] });
  return res.status(200).json({
    data: rows,
    pagination: {
      total: totalCounts[0].total,
      totalP: Math.ceil(totalCounts[0].total / limit),
    },
  });
});

//create a user/admin
app.post("/user", async (req, res) => {
  const { name, email, password, role, debt } = req.body;
  try {
    const hashedP = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (name, email, password, debt, role) VALUES(?,?,?,?,?)",
      [name, email, hashedP, debt, role],
    );

    res.status(201).json({
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Success",
    });
  }
});

//get a user by id
app.get("/user/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM users where id=?";
  const [rows] = await db.query(sql, [id]);
  if (rows.length == 0) {
    res.status(401).json({
      message: "Not Found!!",
    });
  }
  res.status(200).json({
    data: rows[0],
  });
});

//delete a user
app.delete("/user/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    const sql = "DELETE FROM users where id=?";
    await db.query(sql, [id]);
    res.status(200).json({
      message: "deleted!!",
    });
  } catch (err) {
    res.status(500).json({
      message: "error!!",
    });
  }
});

app.get("/", isAuthenticated, (req, res) => {
  return res.status(200).json({
    message: "autorized",
    user: req.user,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`The app is running on port ${process.env.PORT}.`);
});
