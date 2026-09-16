import { useQuery } from "@apollo/client/react";
import { GET_BOOKS } from "../../graphql/queries/book.queries.js";
import BookCard from "./BookCard.jsx";

function BookList({ onView, onEdit, onDelete }) {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) {
    return (
      <section>
        <h2 className="text-xl font-semibold text-text-primary">Books</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-48 animate-pulse rounded-card bg-border"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="rounded-card border border-danger/20 bg-danger/10 p-4">
        <p className="text-sm text-danger">
          Failed to load books: {error.message}
        </p>
      </div>
    );
  }

  if (!data?.books?.length) {
    return (
      <div className="rounded-card border border-border bg-surface p-10 text-center">
        <h2 className="text-lg font-semibold text-text-primary">
          No books found
        </h2>

        <p className="mt-2 text-sm text-text-secondary">
          Add your first book to get started.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Books</h2>

        <p className="mt-1 text-sm text-text-secondary">
          {data.books.length} {data.books.length === 1 ? "book" : "books"}
        </p>
      </div>

      <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default BookList;
