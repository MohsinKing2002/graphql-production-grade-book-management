// App.js is resposible for creating the graphql server and export it
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/schema/index.js";
import { resolvers } from "./graphql/resolvers/index.js";

export const server = new ApolloServer({ typeDefs, resolvers });
