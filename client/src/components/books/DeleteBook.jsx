import { useMutation } from "@apollo/client/react";
import { DELETE_BOOK } from "../../graphql/mutations/book.mutations.js";

function DeleteBook({ bookId }) {
  const [deleteBook, { loading, error, data }] = useMutation(DELETE_BOOK, {
    refetchQueries: ["GetBooks"],
  });

  const handleDelete = async () => {
    await deleteBook({
      variables: {
        id: bookId,
      },
    });
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete Book"}
      </button>

      {error && <p>Error: {error.message}</p>}

      {data?.deleteBook && <p>Deleted: {data.deleteBook.title}</p>}
    </div>
  );
}

export default DeleteBook;
