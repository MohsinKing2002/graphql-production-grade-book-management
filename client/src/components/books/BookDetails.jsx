import { useQuery } from "@apollo/client/react";
import { GET_BOOK } from "../../graphql/queries/book.queries.js";

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: {
      id: bookId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data.book) return <p>Book not found with id: {bookId}</p>;

  const { book } = data;

  return (
    <div>
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Published: {book.publishedYear}</p>
    </div>
  );
};

export default BookDetails;
