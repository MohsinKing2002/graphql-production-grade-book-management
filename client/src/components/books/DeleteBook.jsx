import { useMutation } from "@apollo/client/react";
import { DELETE_BOOK } from "../../graphql/mutations/book.mutations.js";
import { Button } from "../common";

function DeleteBook({ book, onClose }) {
  const [deleteBook, { loading, error }] = useMutation(DELETE_BOOK, {
    update(cache, { data }) {
      const deletedBook = data?.deleteBook;

      if (!deletedBook) return;

      cache.modify({
        fields: {
          books(existingBooks = [], { readField }) {
            return existingBooks.filter(
              (bookRef) => readField("id", bookRef) !== deletedBook.id,
            );
          },
        },
      });
    },
  });

  const handleDelete = async () => {
    try {
      await deleteBook({
        variables: {
          id: book.id,
        },
      });

      onClose(400);
    } catch {
      // Apollo error is displayed below.
    }
  };

  return (
    <div>
      <p className="text-sm leading-6 text-text-secondary">
        Are you sure you want to delete{" "}
        <span className="font-semibold text-text-primary">"{book.title}"</span>?
      </p>

      <p className="mt-2 text-sm text-text-secondary">
        This action cannot be undone.
      </p>

      {error && (
        <p className="mt-4 rounded-md bg-danger/10 p-3 text-sm text-danger">
          {error.message}
        </p>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete Book"}
        </Button>
      </div>
    </div>
  );
}

export default DeleteBook;
