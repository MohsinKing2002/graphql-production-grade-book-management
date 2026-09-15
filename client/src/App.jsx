import "./App.css";
import BookList from "./components/books/BookList";
import BookDetails from "./components/books/BookDetails";
import CreateBook from "./components/books/CreateBook";
import UpdateBook from "./components/books/UpdateBook";
import DeleteBook from "./components/books/DeleteBook";

function App() {
  const book = {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    publishedYear: 2008,
  };

  return (
    <>
      <h1>GraphQL Book Management</h1>

      <BookList />

      <hr />

      <BookDetails bookId="4" />

      <hr />

      <CreateBook />

      <hr />
      <UpdateBook book={book} />

      <hr />
      <DeleteBook bookId={"1"} />
    </>
  );
}

export default App;
