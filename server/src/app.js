// App.js is resposible for creating the graphql server and export it
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/schema/index.js";
import { books } from "./data/data.js";

const resolvers = {
  Query: {
    books: () => books,
    book: (_, args) => {
      return books.find((book) => book.id === args.id);
    },
  },
};

export const server = new ApolloServer({ typeDefs, resolvers });
