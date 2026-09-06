import { createBookService } from "./book.service.js";
import { bookRepository } from "../repositories/index.js";

export const bookService = createBookService(bookRepository);
