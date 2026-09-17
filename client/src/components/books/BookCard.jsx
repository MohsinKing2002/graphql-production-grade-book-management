import Button from "../common/Button.jsx";

function BookCard({ book, onEdit, onDelete, onView }) {
  return (
    <article className="flex h-full flex-col rounded-card border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-text-primary">
          {book.title}
        </h3>

        <p className="mt-2 text-sm text-text-secondary">by {book.author}</p>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-text-secondary">Published</span>

          <span className="font-medium text-text-primary">
            {book.publishedYear ?? "Unknown"}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-text-secondary">Rating</span>

          <span className="font-medium text-text-primary">4.2 ⭐</span>
        </div>
      </div>

      <div className="mt-6 flex justify-evenly flex-wrap gap-2 border-t border-border pt-4">
        <Button variant="secondary" onClick={() => onView(book)}>
          View
        </Button>

        <Button variant="primary" onClick={() => onEdit(book)}>
          Edit
        </Button>

        <Button variant="danger" onClick={() => onDelete(book)}>
          Delete
        </Button>
      </div>
    </article>
  );
}

export default BookCard;
