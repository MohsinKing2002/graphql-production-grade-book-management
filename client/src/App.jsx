import { useState } from "react";
import "./App.css";
import BookList from "./components/books/BookList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Graphql ui..</h1>

      <BookList />
    </>
  );
}

export default App;
