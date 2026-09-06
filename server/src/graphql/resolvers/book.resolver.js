import { bookService } from "../../services/index.js";

export const bookResolvers = {
  Query: {
    books: () => bookService.getBooks(),
    book: (_, { id }) => bookService.getBook(id),
  },
  Mutation: {
    createBook: (_, { input }) => bookService.createBook(input),
    updateBook: (_, { id, input }) => bookService.updateBook(id, input),
    deleteBook: (_, { id }) => bookService.deleteBook(id),
  },
};
