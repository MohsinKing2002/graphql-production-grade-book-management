import { useQuery } from "@apollo/client/react";
import { GET_BOOKS } from "../../graphql/queries/book.queries";

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      <h2>BookList</h2>
      {data.books.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Published: {book.publishedYear}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;
