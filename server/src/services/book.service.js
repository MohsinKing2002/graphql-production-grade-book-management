import {
  getAllBooks,
  getBookById,
  createNewBook,
  updateBookDetails,
  deleteBookByID,
} from "../repositories/book.repository.js";

export const getBooks = () => {
  return getAllBooks();
};

export const getBook = (id) => {
  return getBookById(id);
};

export const createBook = (input) => {
  //error handling
  if (!input.title.trim()) throw new Error("Book title is required");
  if (!input.author.trim()) throw new Error("Book author is required");
  if (input.publishedYear !== undefined && input.publishedYear < 0)
    throw new Error("Invalid publish year");

  // create book object with id
  const book = {
    id: String(Date.now()),
    ...input,
  };

  return createNewBook(book);
};

export const updateBook = (id, input) => {
  const existingBook = getBookById(id);
  if (!existingBook) throw new Error("Book not found");

  if (input.title !== undefined && !input.title.trim())
    throw new Error("Book title cannot be Empty");
  if (input.author !== undefined && !input.author.trim())
    throw new Error("Book author cannot be Empty");
  if (input.publishedYear !== undefined && input.publishedYear < 0)
    throw new Error("Invalid publised year");

  return updateBookDetails(id, input);
};

export const deleteBook = (id) => {
  const existingBook = getBookById(id);
  if (!existingBook) throw new Error("Book not found");

  return deleteBookByID(id);
};
