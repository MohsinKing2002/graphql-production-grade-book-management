import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_BOOK } from "../../graphql/mutations/book.mutations.js";

const CreateBook = () => {
  const [bookInput, setBookInput] = useState({
    title: "",
    author: "",
    publishedYear: 0,
  });

  const [createBook, { data, loading, error }] = useMutation(CREATE_BOOK);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createBook({
      variables: {
        input: bookInput,
      },
    });
  };
  return (
    <div>
      <h2>Add Book</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            value={bookInput.title}
            onChange={(e) =>
              setBookInput((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label>Author</label>
          <input
            value={bookInput.author}
            onChange={(e) =>
              setBookInput((prev) => ({
                ...prev,
                author: e.target.value,
              }))
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
          {loading ? "Creating..." : "Create Book"}
        </button>
      </form>

      {error && <p>Error: {error.message}</p>}

      {data?.createBook && <p>Book created: {data.createBook.title}</p>}
    </div>
  );
};

export default CreateBook;
