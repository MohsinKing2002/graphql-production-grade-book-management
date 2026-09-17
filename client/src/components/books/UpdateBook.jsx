import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_BOOK } from "../../graphql/mutations/book.mutations.js";
import { Input, Button } from "../common";

function UpdateBook({ book, onClose }) {
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    publishedYear: book.publishedYear ?? "",
  });

  const [updateBook, { loading, error }] = useMutation(UPDATE_BOOK, {
    refetchQueries: ["GetBooks"],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateBook({
        variables: {
          id: book.id,
          input: {
            title: formData.title,
            author: formData.author,
            publishedYear: formData.publishedYear
              ? Number(formData.publishedYear)
              : null,
          },
        },
      });

      onClose();
    } catch {
      // Apollo error is displayed below.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <Input
        label="Author"
        name="author"
        value={formData.author}
        onChange={handleChange}
        required
      />

      <Input
        label="Published Year"
        name="publishedYear"
        type="number"
        value={formData.publishedYear}
        onChange={handleChange}
        placeholder="e.g. 2024"
      />

      {error && (
        <p className="rounded-md bg-danger/10 p-3 text-sm text-danger">
          {error.message}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Updating..." : "Update Book"}
        </Button>
      </div>
    </form>
  );
}

export default UpdateBook;
