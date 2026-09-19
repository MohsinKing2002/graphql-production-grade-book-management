import { startStandaloneServer } from "@apollo/server/standalone";
import { server } from "./app.js";
import "dotenv/config";
import { env } from "./config/env.js";

const { url } = await startStandaloneServer(server, {
  listen: {
    port: env.port,
  },
});

console.log(`GraphQL Server is ready at: ${url}`);
