import { describe, expect, it } from "vitest";
import { server } from "../../app.js";
import { executeOperation } from "../helpers/graphql-test-client.js";

describe("Book GraphQL API", () => {
  it("it should fetch all books", async () => {
    const query = `
        query {
            books {
                id
                title
                author
                publishedYear
            }
        }
    `;

    const response = await executeOperation(server, query);
    expect(response.body.kind).toBe("single");
    expect(response.body.singleResult.error).toBeUndefined();
    expect(response.body.singleResult.data.books).toBeDefined();
  });
});
