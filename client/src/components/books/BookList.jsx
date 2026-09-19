import { useQuery } from "@apollo/client/react";
import { GET_BOOKS } from "../../graphql/queries/book.queries.js";
import BookCard from "./BookCard.jsx";
import { Button } from "../../components/common";
import { useState } from "react";

function BookList({ onView, onEdit, onDelete, onCreate }) {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { loading, error, data } = useQuery(GET_BOOKS, {
    variables: {
      page,
      limit,
    },
  });

  const pagination = data?.books?.pagination;

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

  if (!data?.books?.items?.length) {
    return (
      <div className="rounded-card border border-border bg-surface p-10 text-center">
        <h2 className="text-lg font-semibold text-text-primary">
          No books found
        </h2>

        <p className="mt-2 mb-6 text-sm text-text-secondary">
          Add your first book to get started.
        </p>

        <Button onClick={onCreate} variant="primary">
          Add New Book
        </Button>
      </div>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Books</h2>

          <p className="mt-1 text-sm text-text-secondary">
            {data.books.pagination?.totalItems}{" "}
            {data.books.pagination?.totalItems == 1 ? "book" : "books"}
          </p>
        </div>
        <Button onClick={onCreate} variant="primary">
          Add New Book
        </Button>
      </div>

      {/* ---------- books list --------------- */}
      <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data?.books?.items?.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* ---------- pagination --------------- */}
      {pagination && (
        <div className="mt-6 flex justify-end">
          <div className="flex items-center gap-2">
            {/* Previous */}
            <Button
              variant="secondary"
              disabled={!pagination.hasPreviousPage}
              onClick={() => setPage((current) => current - 1)}
            >
              ←
            </Button>

            {/* Page Numbers */}
            {Array.from(
              { length: pagination.totalPages },
              (_, index) => index + 1,
            ).map((pageNumber) => (
              <Button
                key={pageNumber}
                variant={
                  pageNumber === pagination.page ? "primary" : "secondary"
                }
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            ))}

            {/* Next */}
            <Button
              variant="secondary"
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((current) => current + 1)}
            >
              →
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

export default BookList;
