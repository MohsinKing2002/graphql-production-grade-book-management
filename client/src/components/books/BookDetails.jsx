import { useQuery } from "@apollo/client/react";
import { GET_BOOK } from "../../graphql/queries/book.queries.js";

function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: {
      id: bookId,
    },
  });

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-2/3 rounded bg-border" />
        <div className="h-4 w-1/2 rounded bg-border" />
        <div className="h-4 w-1/3 rounded bg-border" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="rounded-md bg-danger/10 p-3 text-sm text-danger">
        {error.message}
      </p>
    );
  }

  const book = data?.book;

  if (!book) {
    return <p className="text-sm text-text-secondary">Book not found.</p>;
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-bold text-text-primary">{book.title}</h3>

        <p className="mt-2 text-text-secondary">by {book.author}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-md bg-background p-4">
          <p className="text-xs text-text-secondary">Published Year</p>

          <p className="mt-1 font-semibold text-text-primary">
            {book.publishedYear ?? "Unknown"}
          </p>
        </div>

        <div className="rounded-md bg-background p-4">
          <p className="text-xs text-text-secondary">Rating</p>

          <p className="mt-1 font-semibold text-text-primary">
            {book.rating ?? "Not rated"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
