import { bookRepository } from "../repositories/index.js";
import { AppError } from "../utils/errors.js";

export const getBooks = () => {
  return bookRepository.getAllBooks();
};

export const getBook = (id) => {
  return bookRepository.getBookById(id);
};

export const createBook = (input) => {
  //error handling
  if (!input.title.trim())
    throw new AppError("Book title is required", "VALIDATION_ERROR");
  if (!input.author.trim())
    throw new AppError("Book author is required", "VALIDATION_ERROR");
  if (input.publishedYear !== undefined && input.publishedYear < 0)
    throw new AppError("Invalid publish year", "VALIDATION_ERROR");

  // create book object with id
  const book = {
    id: String(Date.now()),
    ...input,
  };

  return bookRepository.createNewBook(book);
};

export const updateBook = (id, input) => {
  const existingBook = bookRepository.getBookById(id);
  if (!existingBook) throw new AppError("Book not found", "BOOK_NOT_FOUND");

  if (input.title !== undefined && !input.title.trim())
    throw new AppError("Book title cannot be Empty", "VALIDATION_ERROR");
  if (input.author !== undefined && !input.author.trim())
    throw new AppError("Book author cannot be Empty", "VALIDATION_ERROR");
  if (input.publishedYear !== undefined && input.publishedYear < 0)
    throw new AppError("Invalid publish year", "VALIDATION_ERROR");

  return bookRepository.updateBookDetails(id, input);
};

export const deleteBook = (id) => {
  const existingBook = bookRepository.getBookById(id);
  if (!existingBook) throw new AppError("Book not found", "BOOK_NOT_FOUND");

  return bookRepository.deleteBookByID(id);
};
