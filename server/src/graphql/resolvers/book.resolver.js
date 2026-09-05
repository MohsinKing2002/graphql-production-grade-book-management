import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../../services/book.service.js";

export const bookResolvers = {
  Query: {
    books: () => getBooks(),
    book: (_, { id }) => getBook(id),
  },
  Mutation: {
    createBook: (_, { input }) => createBook(input),
    updateBook: (_, { id, input }) => updateBook(id, input),
    deleteBook: (_, { id }) => deleteBook(id),
  },
};
