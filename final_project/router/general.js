const axios = require("axios");

const getBooks = async () => {
  const res = await axios.get("http://localhost:5000/");
  return res.data;
};

const getBookByISBN = async (isbn) => {
  const res = await axios.get(`http://localhost:5000/isbn/${isbn}`);
  return res.data;
};

const getBooksByAuthor = async (author) => {
  const res = await axios.get(`http://localhost:5000/author/${author}`);
  return res.data;
};

const getBooksByTitle = async (title) => {
  const res = await axios.get(`http://localhost:5000/title/${title}`);
  return res.data;
};

module.exports = {
  getBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};
