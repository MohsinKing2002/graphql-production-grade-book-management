// App.js is resposible for creating the graphql server and export it
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/schema/index.js";
import { resolvers } from "./graphql/resolvers/index.js";
import { AppError } from "./utils/errors.js";

export const server = new ApolloServer({
  typeDefs,
  resolvers,

  formatError: (formattedError, error) => {
    const originalError = error.originalError;

    // Expected application error
    if (originalError instanceof AppError) {
      return {
        ...formattedError,
        message: originalError.message,
        extensions: {
          ...formattedError.extensions,
          code: originalError?.code,
        },
      };
    }

    // Unexpected application error
    console.error("Unexpected graphql error :->>", originalError);

    return {
      message: "Internal Server Error",
      extensions: {
        ...formattedError.extensions,
        code: "INTERNAL_SERVER_ERROR",
      },
    };
  },
});
