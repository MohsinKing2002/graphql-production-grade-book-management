import { useState } from "react";

import AppLayout from "./components/layout/AppLayout.jsx";
import BookList from "./components/books/BookList.jsx";
import BookDetails from "./components/books/BookDetails.jsx";
import CreateBook from "./components/books/CreateBook.jsx";
import UpdateBook from "./components/books/UpdateBook.jsx";
import DeleteBook from "./components/books/DeleteBook.jsx";
import Modal from "./components/common/Modal.jsx";

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [modal, setModal] = useState(null);

  const openModal = (type, book = null) => {
    setSelectedBook(book);
    setModal(type);
  };

  const closeModal = () => {
    setTimeout(() => {
      setModal(null);
      setSelectedBook(null);
    }, 500);
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <BookList
          onCreate={() => openModal("create")}
          onView={(book) => openModal("view", book)}
          onEdit={(book) => openModal("edit", book)}
          onDelete={(book) => openModal("delete", book)}
        />
      </div>

      <Modal open={modal === "create"} title="Add a Book" onClose={closeModal}>
        <CreateBook onClose={closeModal} />
      </Modal>

      <Modal open={modal === "view"} title="Book Details" onClose={closeModal}>
        {selectedBook && <BookDetails bookId={selectedBook.id} />}
      </Modal>

      <Modal open={modal === "edit"} title="Edit Book" onClose={closeModal}>
        {selectedBook && (
          <UpdateBook book={selectedBook} onClose={closeModal} />
        )}
      </Modal>

      <Modal open={modal === "delete"} title="Delete Book" onClose={closeModal}>
        {selectedBook && (
          <DeleteBook book={selectedBook} onClose={closeModal} />
        )}
      </Modal>
    </AppLayout>
  );
}

export default App;
