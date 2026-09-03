// App.js is resposible for creating the graphql server and export it
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/schema/index.js";
import { getBooks, getBook, createBook } from "./services/book.service.js";

const resolvers = {
  Query: {
    books: () => getBooks(),
    book: (_, args) => getBook(args.id),
  },
  Mutation: {
    createBook: (_, args) => createBook(args.input),
  },
};

export const server = new ApolloServer({ typeDefs, resolvers });
