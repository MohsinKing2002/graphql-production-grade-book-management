export const createBookResolvers = (bookService) => ({
  Query: {
    books: (_, { page, limit }) => bookService.getPaginatedBooks(page, limit),
    book: (_, { id }) => bookService.getBook(id),
  },
  Mutation: {
    createBook: (_, { input }) => bookService.createBook(input),
    updateBook: (_, { id, input }) => bookService.updateBook(id, input),
    deleteBook: (_, { id }) => bookService.deleteBook(id),
  },
});
