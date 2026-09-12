import "./App.css";
import BookList from "./components/books/BookList";
import BookDetails from "./components/books/BookDetails";
import CreateBook from "./components/books/CreateBook";

function App() {
  return (
    <>
      <h1>GraphQL Book Management</h1>

      <BookList />

      <hr />

      <BookDetails bookId="44" />

      <hr />

      <CreateBook />
    </>
  );
}

export default App;
