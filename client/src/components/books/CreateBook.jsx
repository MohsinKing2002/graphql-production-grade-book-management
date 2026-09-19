import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_BOOK } from "../../graphql/mutations/book.mutations.js";
import { Input, Button } from "../common";
import { gql } from "@apollo/client";

function CreateBook({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedYear: "",
  });

  const [createBook, { loading, error }] = useMutation(CREATE_BOOK, {
    refetchQueries: ["GetBooks"],

    // update(cache, { data }) {
    //   const newBook = data?.createBook;

    //   if (!newBook) return;

    //   cache.modify({
    //     fields: {
    //       books(existingBooks = [], { readField }) {
    //         const alreadyExists = existingBooks.some(
    //           (bookRef) => readField("id", bookRef) === newBook.id,
    //         );

    //         if (alreadyExists) return existingBooks;

    //         return [
    //           ...existingBooks,
    //           cache.writeFragment({
    //             data: newBook,
    //             fragment: gql`
    //               fragment NewBook on Book {
    //                 id
    //                 title
    //                 author
    //                 publishedYear
    //               }
    //             `,
    //           }),
    //         ];
    //       },
    //     },
    //   });
    // },
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

      onClose(400);
    } catch (error) {
      console.error("Failed to create book:", error);
    }
  };

  return (
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
        required
      />

      {error && (
        <p className="rounded-md bg-danger/10 p-3 text-sm text-danger">
          {error.message}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <Button onClick={onClose} variant="secondary">
          Cancel
        </Button>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Creating..." : "Create Book"}
        </Button>
      </div>
    </form>
  );
}

export default CreateBook;
