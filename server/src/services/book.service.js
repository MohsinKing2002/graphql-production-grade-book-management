import { AppError } from "../utils/errors.js";

export const createBookService = (bookRepository) => ({
  getBooks: () => {
    return bookRepository.getAllBooks();
  },

  getBook: (id) => {
    return bookRepository.getBookById(id);
  },

  createBook: (input) => {
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
  },

  updateBook: (id, input) => {
    const existingBook = bookRepository.getBookById(id);
    if (!existingBook) throw new AppError("Book not found", "BOOK_NOT_FOUND");

    if (input.title !== undefined && !input.title.trim())
      throw new AppError("Book title cannot be Empty", "VALIDATION_ERROR");
    if (input.author !== undefined && !input.author.trim())
      throw new AppError("Book author cannot be Empty", "VALIDATION_ERROR");
    if (input.publishedYear !== undefined && input.publishedYear < 0)
      throw new AppError("Invalid publish year", "VALIDATION_ERROR");

    return bookRepository.updateBookDetails(id, input);
  },

  deleteBook: (id) => {
    const existingBook = bookRepository.getBookById(id);
    if (!existingBook) throw new AppError("Book not found", "BOOK_NOT_FOUND");

    return bookRepository.deleteBookByID(id);
  },
});
