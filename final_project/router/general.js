const express = require('express');
const public_users = express.Router();

let books = require("./booksdb.js");

// user DB
let users = [];

const isValid = (username) => username.length > 0;

const doesExist = (username) => {
    return users.some(user => user.username === username);
};

// Task 1: Get all books
public_users.get('/', (req, res) => {
    return res.send(JSON.stringify(books, null, 2));
});

// Task 2: Get by ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    return res.send(books[isbn]);
});

// Task 3: Get by author
public_users.get('/author/:author', (req, res) => {
    const author = req.params.author;
    let result = {};

    for (let key in books) {
        if (books[key].author === author) {
            result[key] = books[key];
        }
    }

    return res.send(result);
});

// Task 4: Get by title
public_users.get('/title/:title', (req, res) => {
    const title = req.params.title;
    let result = {};

    for (let key in books) {
        if (books[key].title === title) {
            result[key] = books[key];
        }
    }

    return res.send(result);
});

// Task 5: Get reviews
public_users.get('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    return res.send(books[isbn].reviews);
});

// Task 6: Register
public_users.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Missing fields" });
    }

    if (doesExist(username)) {
        return res.status(409).json({ message: "User exists" });
    }

    if (isValid(username)) {
        users.push({ username, password });
        return res.json({ message: "Registered successfully" });
    }
});

module.exports.general = public_users;
module.exports.users = users;