import { AppError } from "../utils/errors.js";

export const createBookService = (bookRepository) => ({
  getBooks: () => {
    return bookRepository.getAllBooks();
  },

  getPaginatedBooks: (page = 1, limit = 10) => {
    //pagination validation
    if (page < 1)
      throw new AppError(
        "Page must be greater than or equal to 1",
        "VALIDATION_ERROR",
      );

    if (limit < 1)
      throw new AppError(
        "Limit must be greater than or equal to 1",
        "VALIDATION_ERROR",
      );

    if (limit > 100)
      throw new AppError("Limit cannot exceed 100", "VALIDATION_ERROR");

    const offset = (page - 1) * limit;

    const { items, totalItems } = bookRepository.getPaginatedBooks(
      offset,
      limit,
    );
    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
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
