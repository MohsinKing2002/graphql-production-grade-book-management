const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <h1 className="text-2xl font-bold">GraphQL Book Management</h1>

          <p className="mt-1 text-sm text-text-secondary">
            Manage your books with GraphQL
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
};

export default AppLayout;
