import { describe, expect, it } from "vitest";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../services/book.service.js";

describe("Book Service", () => {
  describe("getBooks", () => {
    it("should return all books", () => {
      const books = getBooks();

      expect(books).toBeInstanceOf(Array);
      expect(books.length).toBeGreaterThan(0);
    });
  });

  describe("getBook", () => {
    it("should return a book when the id exists", () => {
      const book = getBook("1");

      expect(book).toBeDefined();
      expect(book.id).toBe("1");
    });

    it("should return undefined when the ID doesn't exists", () => {
      const book = getBook("10111");

      expect(book).toBeUndefined();
    });
  });

  describe("createBook", () => {
    it("it should create and return a new book", () => {
      const book = createBook({
        title: "Test Book",
        author: "Test Author",
        publishedYear: 2026,
      });

      expect(book).toMatchObject({
        title: "Test Book",
        author: "Test Author",
        publishedYear: 2026,
      });
      expect(book.id).toBeDefined();
    });

    it("should reject an empty title", () => {
      expect(() =>
        createBook({
          title: "",
          author: "Test Author",
          publishedYear: 2026,
        }),
      ).toThrow("Book title is required");
    });
    it("should reject an empty author", () => {
      expect(() =>
        createBook({
          title: "Test title",
          author: "",
          publishedYear: 2026,
        }),
      ).toThrow("Book author is required");
    });
    it("should reject an invalid year", () => {
      expect(() =>
        createBook({
          title: "Test title",
          author: "Test Author",
          publishedYear: -2026,
        }),
      ).toThrow("Invalid publish year");
    });
  });

  describe("updateBook", () => {
    it("should update an existing book", () => {
      const book = updateBook("1", {
        title: "Updated Title",
      });

      expect(book).toBeDefined();
      expect(book.id).toBe("1");
      expect(book.title).toBe("Updated Title");
    });

    it("should reject updating a nonexistent book", () => {
      expect(() =>
        updateBook("999", {
          title: "Updated Book",
        }),
      ).toThrow("Book not found");
    });

    it("should reject an empty title", () => {
      expect(() =>
        updateBook("1", {
          title: "",
        }),
      ).toThrow("Book title cannot be Empty");
    });
    it("should reject an empty author", () => {
      expect(() =>
        updateBook("1", {
          author: "",
        }),
      ).toThrow("Book author cannot be Empty");
    });
    it("should reject an invalid year", () => {
      expect(() =>
        updateBook("1", {
          publishedYear: -2026,
        }),
      ).toThrow("Invalid publish year");
    });
  });

  describe("deleteBook", () => {
    it("it should delete existing book", () => {
      const book = deleteBook("1");

      expect(book).toBeDefined();
      expect(book.id).toBe("1");
    });

    it("should reject deleting non-existing book", () => {
      expect(() => deleteBook("100000")).toThrow("Book not found");
    });
  });
});
