export const createBookRepository = (books) => ({
  getAllBooks: () => {
    return books;
  },

  getBookById: (id) => {
    return books.find((book) => book.id === id);
  },

  createNewBook: (book) => {
    books.push(book);
    return book;
  },

  updateBookDetails: (id, updates) => {
    const book = books.find((book) => book.id === id);
    if (!book) return null;

    Object.assign(book, updates);
    return book;
  },

  deleteBookByID: (id) => {
    const ind = books.findIndex((book) => book.id === id);

    if (ind === -1) return null;

    const [deletedBook] = books.splice(ind, 1);

    return deletedBook;
  },
});
