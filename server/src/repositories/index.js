import { books } from "../data/data.js";
import { createBookRepository } from "./book.repository.js";

export const bookRepository = createBookRepository(books);
