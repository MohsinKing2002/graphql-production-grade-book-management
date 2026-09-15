import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_BOOK } from "../../graphql/mutations/book.mutations.js";

const UpdateBook = ({ book }) => {
  const [bookInput, setBookInput] = useState({
    title: book?.title,
    author: book?.author,
    publishedYear: book?.publishedYear,
  });
  const [updateBook, { data, loading, error }] = useMutation(UPDATE_BOOK, {
    refetchQueries: ["GetBooks"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateBook({
      variables: {
        id: book.id,
        input: bookInput,
      },
    });
  };
  return (
    <div>
      <h2>Update Book</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            value={bookInput.title}
            onChange={(e) =>
              setBookInput((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <div>
          <label>Author</label>
          <input
            value={bookInput.author}
            onChange={(e) =>
              setBookInput((prev) => ({ ...prev, author: e.target.value }))
            }
          />
        </div>

        <div>
          <label>Published Year</label>
          <input
            type="number"
            value={bookInput.publishedYear}
            onChange={(e) =>
              setBookInput((prev) => ({
                ...prev,
                publishedYear: Number(e.target.value),
              }))
            }
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Book"}
        </button>
      </form>

      {error && <p>Error: {error.message}</p>}

      {data?.updateBook && <p>Book updated: {data.updateBook.title}</p>}
    </div>
  );
};

export default UpdateBook;
