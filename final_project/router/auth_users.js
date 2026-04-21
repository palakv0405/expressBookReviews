const express = require('express');
const jwt = require('jsonwebtoken');
const regd_users = express.Router();

let books = require("./booksdb.js");
let users = require("./general.js").users;

// LOGIN
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, "fingerprint_customer", { expiresIn: "1h" });

    return res.json({ token });
});

// ADD / MODIFY REVIEW
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.user.username;

    books[isbn].reviews[username] = review;

    return res.json({ message: "Review added/updated" });
});

// DELETE REVIEW
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.user.username;

    delete books[isbn].reviews[username];

    return res.json({ message: "Review deleted" });
});

module.exports.authenticated = regd_users;