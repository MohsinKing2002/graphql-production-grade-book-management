// App.js is resposible for creating the graphql server and export it
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/schema/index.js";
import { getAllBooks, getBookById } from "./repositories/book.repository.js";

const resolvers = {
  Query: {
    books: () => getAllBooks(),
    book: (_, args) => getBookById(args.id),
  },
};

export const server = new ApolloServer({ typeDefs, resolvers });
