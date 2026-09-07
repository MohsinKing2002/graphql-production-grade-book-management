import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../graphql/schema/index";
import { createBookResolvers } from "../graphql/resolvers/book.resolver";
import { createBookService } from "../services/book.service";
import { createBookRepository } from "../repositories/book.repository";
import { testBooks } from "./fixtures/book.fixture.js";

export const createTestServer = () => {
  const books = structuredClone(testBooks);
  const bookRepository = createBookRepository(books);
  const bookService = createBookService(bookRepository);
  const resolvers = createBookResolvers(bookService);

  return new ApolloServer({
    typeDefs,
    resolvers,

    formatError: (formattedError, error) => {
      if (error.originalError?.code) {
        return {
          ...formattedError,
          extensions: {
            ...formattedError.extensions,
            code: error.originalError?.code,
          },
        };
      }

      return formattedError;
    },
  });
};
