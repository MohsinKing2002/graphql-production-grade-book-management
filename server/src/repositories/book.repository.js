import { books } from "../data/data.js";

export const getAllBooks = () => {
  return books;
};

export const getBookById = (id) => {
  return books.find((book) => book.id === id);
};

export const createNewBook = (book) => {
  books.push(book);
  return book;
};

export const updateBookDetails = (id, updates) => {
  const book = books.find((book) => book.id === id);
  if (!book) return null;

  Object.assign(book, updates);
  return book;
};

export const deleteBookByID = (id) => {
  const ind = books.findIndex((book) => book.id === id);

  if (ind === -1) return null;

  const [deletedBook] = books.splice(ind, 1);

  return deletedBook;
};
