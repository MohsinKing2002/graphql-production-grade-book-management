import { startStandaloneServer } from "@apollo/server/standalone";
import { server } from "./app.js";

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`GraphQL Server is ready at: ${url}`);
