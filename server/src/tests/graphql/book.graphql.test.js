import { describe, expect, it } from "vitest";
import { createTestServer } from "../test-server.js";
import { executeOperation } from "../helpers/graphql-test-client.js";

describe("Book GraphQL API", () => {
  /***** Queries - All Books *****/
  it("it should fetch all books", async () => {
    const server = createTestServer();
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
    expect(response.body.singleResult.data.books).toHaveLength(2);
    expect(response.body.singleResult.data.books[0]).toEqual({
      id: "1",
      title: "Test Book 1",
      author: "Test Author 1",
      publishedYear: 2020,
    });
  });

  /***** Queries - Book by Id *****/
  it("should fetch a book by id", async () => {
    const server = createTestServer();

    const query = `
      query {
        book(id: "1") {
          id
          title
          author
          publishedYear
        }
      }
    `;

    const response = await executeOperation(server, query);

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data.book).toEqual({
      id: "1",
      title: "Test Book 1",
      author: "Test Author 1",
      publishedYear: 2020,
    });
  });

  it("should return null when book doesn't exist", async () => {
    const server = createTestServer();

    const query = `
      query {
        book(id: "id-doesn't-exist") {
          id
          title
          author
          publishedYear
        }
      }
    `;

    const response = await executeOperation(server, query);

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data.book).toBeNull();
  });

  it("should fetch a book using GraphQL variables", async () => {
    const server = createTestServer();

    const query = `
      query GetBook($id: ID!) {
        book(id: $id) {
          id
          title
          author
          publishedYear
        }
      }
    `;

    const response = await executeOperation(server, query, {
      id: "2",
    });

    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data.book).toEqual({
      id: "2",
      title: "Test Book 2",
      author: "Test Author 2",
      publishedYear: 2021,
    });
  });

  /***** Mutation - Create Book *****/
  it("it should create a new book", async () => {
    const server = createTestServer();
    const mutation = `
      mutation CreateBook($input: CreateBookInput!) {
        createBook(input: $input) {
          id
          title
          author
          publishedYear
        }
      }
    `;

    const variables = {
      input: {
        title: "Test Book 3",
        author: "Test Author 3",
        publishedYear: 2021,
      },
    };

    const response = await executeOperation(server, mutation, variables);
    expect(response.body.singleResult.errors).toBeUndefined();

    const createdBook = response.body.singleResult.data.createBook;
    expect(createdBook.id).toBeDefined();
    expect(createdBook.title).toBe("Test Book 3");
    expect(createdBook.author).toBe("Test Author 3");
    expect(createdBook.publishedYear).toBe(2021);
  });

  it("should persist the created book for subsequent queries", async () => {
    const server = createTestServer();

    //create new book
    const mutation = `
      mutation CreateBook($input: CreateBookInput!) {
        createBook(input: $input) {
          id
          title
          author
          publishedYear
        }
      }
    `;

    const variables = {
      input: {
        title: "Test Book 4",
        author: "Test Author 4",
        publishedYear: 3030,
      },
    };

    const response = await executeOperation(server, mutation, variables);
    expect(response.body.singleResult.errors).toBeUndefined();
    const createdBook = response.body.singleResult.data.createBook;

    // check persistent
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
    const persistResponse = await executeOperation(server, query);

    expect(persistResponse.body.singleResult.errors).toBeUndefined();
    expect(persistResponse.body.singleResult.data.books).toContainEqual(
      createdBook,
    );
  });

  /***** Mutation - Update Book *****/
  it("should update an existing book", async () => {
    const server = createTestServer();

    const mutation = `
      mutation UpdateBook(
        $id: ID! 
        $input: UpdateBookInput!
      ) {
        updateBook(id: $id, input: $input) {
          id
          title
          author
          publishedYear
        }
      }
    `;
    const variables = {
      id: "2",
      input: {
        title: "Update - Book Title 2",
        author: "Update - Book Author 2",
      },
    };

    const response = await executeOperation(server, mutation, variables);
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data.updateBook).toEqual({
      id: "2",
      title: "Update - Book Title 2",
      author: "Update - Book Author 2",
      publishedYear: 2021,
    });
  });

  /***** Mutation - Delete Book *****/
  it("should delete an existing book", async () => {
    const server = createTestServer();

    const mutation = `
      mutation DeleteBook($id: ID!) {
        deleteBook(id: $id) {
          id
          title
          author
          publishedYear
        }
      }
    `;
    const variables = {
      id: "2",
    };

    const response = await executeOperation(server, mutation, variables);
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data.deleteBook).toEqual({
      id: "2",
      title: "Test Book 2",
      author: "Test Author 2",
      publishedYear: 2021,
    });
  });

  it("should not find a book after deleting it", async () => {
    const server = createTestServer();

    const mutation = `
      mutation DeleteBook($id: ID!) {
        deleteBook(id: $id) {
          id
        }
      }
    `;
    const variables = {
      id: "2",
    };

    const response = await executeOperation(server, mutation, variables);
    expect(response.body.singleResult.errors).toBeUndefined();

    const query = `
      query {
        book(id: "2"){
          id
        }
      }
    `;

    const responseDeleted = await executeOperation(server, query);
    expect(responseDeleted.body.singleResult.errors).toBeUndefined();
    expect(responseDeleted.body.singleResult.data.book).toBeNull();
  });
});
