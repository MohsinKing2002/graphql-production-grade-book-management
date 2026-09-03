import { books } from "../data/data.js";

export const getAllBooks = () => {
  return books;
};

export const getBookById = (id) => {
  return books.find((book) => book.id === id);
};
