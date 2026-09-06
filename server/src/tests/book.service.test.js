import { describe, expect, it, beforeEach } from "vitest";
import { createBookService } from "../services/book.service.js";
import { createBookRepository } from "../repositories/book.repository.js";
import { testBooks } from "./fixtures/book.fixture.js";

let bookService, books;

beforeEach(() => {
  books = structuredClone(testBooks);
  const testRepository = createBookRepository(books);
  bookService = createBookService(testRepository);
});

describe("Book Service", () => {
  describe("getBooks", () => {
    it("should return all books", () => {
      const books = bookService.getBooks();

      expect(books).toBeInstanceOf(Array);
      expect(books).toHaveLength(2);
    });
  });

  describe("getBook", () => {
    it("should return a book when the id exists", () => {
      const book = bookService.getBook("1");

      expect(book).toBeDefined();
      expect(book.id).toBe("1");
    });

    it("should return undefined when the ID doesn't exists", () => {
      const book = bookService.getBook("10111");

      expect(book).toBeUndefined();
    });
  });

  describe("createBook", () => {
    it("should not modify the original test fixture", () => {
      bookService.createBook({
        title: "New Test Book",
        author: "Test Author",
        publishedYear: 2025,
      });

      expect(testBooks).toHaveLength(2);
    });

    it("it should create and return a new book", () => {
      const book = bookService.createBook({
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
        bookService.createBook({
          title: "",
          author: "Test Author",
          publishedYear: 2026,
        }),
      ).toThrow("Book title is required");
    });
    it("should reject an empty author", () => {
      expect(() =>
        bookService.createBook({
          title: "Test title",
          author: "",
          publishedYear: 2026,
        }),
      ).toThrow("Book author is required");
    });
    it("should reject an invalid year", () => {
      expect(() =>
        bookService.createBook({
          title: "Test title",
          author: "Test Author",
          publishedYear: -2026,
        }),
      ).toThrow("Invalid publish year");
    });
  });

  describe("updateBook", () => {
    it("should update an existing book", () => {
      const book = bookService.updateBook("1", {
        title: "Updated Title",
      });

      expect(book).toBeDefined();
      expect(book.id).toBe("1");
      expect(book.title).toBe("Updated Title");
    });

    it("should reject updating a nonexistent book", () => {
      expect(() =>
        bookService.updateBook("999", {
          title: "Updated Book",
        }),
      ).toThrow("Book not found");
    });

    it("should reject an empty title", () => {
      expect(() =>
        bookService.updateBook("1", {
          title: "",
        }),
      ).toThrow("Book title cannot be Empty");
    });
    it("should reject an empty author", () => {
      expect(() =>
        bookService.updateBook("1", {
          author: "",
        }),
      ).toThrow("Book author cannot be Empty");
    });
    it("should reject an invalid year", () => {
      expect(() =>
        bookService.updateBook("1", {
          publishedYear: -2026,
        }),
      ).toThrow("Invalid publish year");
    });
  });

  describe("deleteBook", () => {
    it("it should delete existing book", () => {
      const book = bookService.deleteBook("1");

      expect(book).toBeDefined();
      expect(book.id).toBe("1");
    });

    it("should reject deleting non-existing book", () => {
      expect(() => bookService.deleteBook("100000")).toThrow("Book not found");
    });
  });
});
