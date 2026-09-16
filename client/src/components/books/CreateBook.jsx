import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_BOOK } from "../../graphql/mutations/book.mutations.js";
import { Input, Button } from "../common";

function CreateBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedYear: "",
  });

  const [createBook, { loading, error }] = useMutation(CREATE_BOOK, {
    refetchQueries: ["GetBooks"],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createBook({
        variables: {
          input: {
            title: formData.title,
            author: formData.author,
            publishedYear: formData.publishedYear
              ? Number(formData.publishedYear)
              : null,
          },
        },
      });

      setFormData({
        title: "",
        author: "",
        publishedYear: "",
      });
    } catch (error) {
      console.error("Failed to create book:", error);
    }
  };

  return (
    <section className="rounded-card border border-border bg-surface p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add a Book</h2>

        <p className="mt-1 text-sm text-text-secondary">
          Add a new book to your collection.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Title"
          name="title"
          placeholder="Enter Book Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <Input
          label="Author"
          name="author"
          placeholder="Enter Book Author"
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
          <Button variant="secondary">Cancel</Button>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Creating..." : "Create Book"}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default CreateBook;
