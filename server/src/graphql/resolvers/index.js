import { createBookResolvers } from "./book.resolver.js";
import { createBookService } from "../../services/book.service.js";
import { bookRepository } from "../../repositories/index.js";

const bookService = createBookService(bookRepository);
export const resolvers = createBookResolvers(bookService);
