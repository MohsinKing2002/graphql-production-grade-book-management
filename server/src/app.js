// App.js is resposible for creating the graphql server and export it
import { ApolloServer } from "@apollo/server";

const typeDefs = `#graphql
    type Query {
        hello: String
    }
`;

const resolvers = {
  Query: {
    hello: () => "Hello GraphQL",
  },
};

export const server = new ApolloServer({ typeDefs, resolvers });
