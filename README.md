# Graphql Production Grade Book Management Application

## Table of Contents

- [Project Overview](#project-overview)
- [Goals](#goals)
- [Application Overview](#application-overview)
- [Architectural Principles](#architectural-principles)
- [Data Storage Strategy](#data-storage-strategy)
- [Proposed Project Structure](#proposed-project-structure)
- [Backend Layers](#backend-layers)
- [GraphQL Concepts We Will Learn](#graphql-concepts-we-will-learn)
- [Frontend Architecture
  ](#frontend-architecture)
- [GraphQL Client](#graphql-client)
- [Development Phases](#development-phases)
- [Future Database Migration](#future-database-migration)
- [Engineering Principles](#engineering-principles)
- [Technology Stack](#technology-stack)
- [Final Target Architecture](#final-target-architecture)

# Project Overview

A small full-stack application for learning and exploring GraphQL using a production-oriented architecture.

The application allows users to:

- View a list of books
- View a single book
- Add a book
- Update a book
- Delete a book

The project intentionally does not use a database. Instead, an in-memory JavaScript array will act as the data store.

The goal is not simply to build CRUD functionality, but to understand how a production-style GraphQL application can be structured, layered, tested, and evolved.

## 1. Goals

The primary goals of this project are:

- Learn GraphQL from the ground up.
- Understand how a GraphQL API is structured.
- Understand the relationship between:
- Schema
- Queries
- Mutations
- Resolvers
- Services
- Repositories
- Data sources
- Build a React frontend that consumes the GraphQL API.
- Follow production-oriented coding and architectural practices.
  Understand why different layers exist and when they are useful.
- Learn how the architecture could later evolve to use a real database.

## 2. Application Overview

The application is a simple Book Management System.

The initial domain model will be:

```
Book
├── id
├── title
├── author
└── publishedYear
```

The application will support:

```
┌──────────────────────────┐
│       React Frontend     │
│                          │
│  Book List               │
│  Book Details            │
│  Add Book                │
│  Edit Book               │
│  Delete Book             │
└────────────┬─────────────┘
             │
             │ GraphQL
             ▼
┌──────────────────────────┐
│       GraphQL API        │
│                          │
│ Queries                  │
│ Mutations                │
│ Schema                   │
│ Resolvers                │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│      Service Layer       │
│                          │
│ Business/Application     │
│ Logic                    │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│    Repository Layer      │
│                          │
│ Data Access              │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│       data.js            │
│                          │
│ In-memory books array    │
└──────────────────────────┘
```

## 3. Architectural Principles

The project will follow these principles.

### 3.1 Separation of Concerns

Each layer should have a clear responsibility.

For example:

```
GraphQL Resolver
    ↓
Service
    ↓
Repository
    ↓
Data
```

A resolver should not contain all of the application's business logic.

Similarly, the React components should not know how the backend stores books.

### 3.2 Keep GraphQL Thin

GraphQL resolvers should primarily translate GraphQL operations into application operations.

For example:

```
async function addBook(_, { input }) {
  return bookService.createBook(input);
}
```

The resolver should not become a large function containing validation, business rules, and data manipulation.

### 3.3 Business Logic Belongs in the Service Layer

Application/business rules should live in services.

Example:

```
bookService.createBook(input);
bookService.getBooks();
bookService.updateBook(id, input);
bookService.deleteBook(id);
```

If a business rule changes, the service layer should generally be the first place to consider.

Example:
A book title must be unique.
This is a business rule, not a GraphQL concern.

### 3.4 Data Access Belongs in the Repository Layer

The repository owns interaction with the underlying data source.

Initially:

```
Repository
    ↓
data.js
```

Later:

```
Repository
    ↓
PostgreSQL
```

The rest of the application should not need to know whether books are stored in an array, PostgreSQL, MongoDB, etc.

### 3.5 Avoid Direct Data Manipulation Outside the Repository

Avoid code such as:

`books.push(book);` or `books = books.filter(...);`

being scattered throughout the application.

Instead:

```
bookRepository.create(book);
bookRepository.delete(id);
bookRepository.update(id, changes);
```

The repository owns the data manipulation.

## 4. Data Storage Strategy

This project deliberately does not use a database.

Instead, we will have a file similar to: `server/src/data/data.js`

Example:

```
export const books = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    publishedYear: 2008
  },
  {
    id: "2",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    publishedYear: 1999
  }
];
```

The array acts as our temporary data store.

Important limitation

This data is stored only in memory.

Therefore:

Data disappears when the server restarts.
Multiple server instances would not share the same data.
It is not suitable for production persistence.

This is intentional.

The purpose is to focus on learning GraphQL and application architecture without introducing database complexity.

## 5. Proposed Project Structure

The target architecture is:

```
book-graphql-app/
│
├── server/
│   │
│   ├── src/
│   │   │
│   │   ├── graphql/
│   │   │   ├── schema/
│   │   │   │   ├── book.schema.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── resolvers/
│   │   │   │   ├── book.resolver.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── index.js
│   │   │
│   │   ├── services/
│   │   │   └── book.service.js
│   │   │
│   │   ├── repositories/
│   │   │   └── book.repository.js
│   │   │
│   │   ├── data/
│   │   │   └── data.js
│   │   │
│   │   ├── utils/
│   │   │   └── ...
│   │   │
│   │   ├── config/
│   │   │   └── ...
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── ...
│
├── client/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── BookList/
│   │   │   ├── BookItem/
│   │   │   └── BookForm/
│   │   │
│   │   ├── pages/
│   │   │   └── Books/
│   │   │
│   │   ├── graphql/
│   │   │   ├── queries/
│   │   │   └── mutations/
│   │   │
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── package.json
└── README.md
```

The final structure may change as the application evolves. We will not create folders simply for the sake of having a large architecture.

## 6. Backend Layers

### 6.1 GraphQL Layer

Location: `server/src/graphql/`

Responsibilities:

- GraphQL schema
- Queries
- Mutations
- Resolvers
- GraphQL-specific input/output definitions

Example:

```
type Query {
  books: [Book!]!
}

type Mutation {
  addBook(input: AddBookInput!): Book!
}
```

### 6.2 Service Layer

Location: `server/src/services/`

Responsibilities:

- Business logic
- Application rules
- Coordinating repository operations
- Handling domain-level decisions

Example:

```
bookService.createBook(input);
bookService.getBooks();
bookService.updateBook(id, input);
bookService.deleteBook(id);
```

### 6.3 Repository Layer

Location: `server/src/repositories/`

Responsibilities:

- Data access
- Finding records
- Creating records
- Updating records
- Deleting records

Example:

```
bookRepository.findAll();
bookRepository.findById(id);
bookRepository.create(book);
bookRepository.update(id, changes);
bookRepository.delete(id);
```

### 6.4 Data Layer

Location: `server/src/data/`

Initially this will contain: `data.js`

This is our fake database. The repository will interact with it.

## 7. GraphQL API

The API will eventually expose operations similar to:

```
# 1. Query all books
query {
  books {
    id
    title
    author
    publishedYear
  }
}

# 2. Query a single book
query {
  book(id: "1") {
    id
    title
    author
    publishedYear
  }
}

# 3. Add a book
mutation {
  addBook(
    input: {
      title: "Clean Architecture"
      author: "Robert C. Martin"
      publishedYear: 2017
    }
  ) {
    id
    title
    author
  }
}

# 4. Update a book
mutation {
  updateBook(
    id: "1"
    input: {
      title: "Clean Code - Updated"
    }
  ) {
    id
    title
    author
  }
}

# 5. Delete a book
mutation {
  deleteBook(id: "1")
}
```

The exact schema will be designed and discussed during implementation rather than blindly copying this initial example.

## 8. GraphQL Concepts We Will Learn

- Fundamentals
- GraphQL schema
- Object types
- Scalar types
- Query
- Mutation
- Resolvers
- Arguments
- Variables
- ID
- Nullable fields
- Non-null fields
- Intermediate GraphQL
- Input types
- Nested objects
- Fragments
- Error handling
- Validation
- Custom errors
- Context
- Resolver composition
- Client-side GraphQL
- GraphQL queries
- GraphQL mutations
- Variables
- Loading states
- Error states
- Apollo Client
- Apollo cache
- useQuery
- useMutation
- Refetching
- Cache updates
- Optimistic updates

## 9. Frontend Architecture

The frontend will use React.

The initial component structure will be conceptually:

```
Books Page
│
├── BookList
│   │
│   └── BookItem
│
└── BookForm
```

GraphQL operations will be kept separate from UI components.

For example:

```
client/src/graphql/
│
├── queries/
│   └── book.queries.js
│
└── mutations/
    └── book.mutations.js
```

The goal is to avoid large components containing GraphQL documents, UI logic, state management, and business logic all in one file.

## 10. GraphQL Client

We will use Apollo Client on the frontend.

The intended architecture is:

```
React
↓
Apollo Client
↓
GraphQL API
↓
Apollo Server
```

Apollo Client will allow us to explore real-world GraphQL client concerns such as:

- Query execution
- Mutation execution
- Variables
- Loading/error states
- Cache management
- Refetching
- Optimistic updates

## 11. Development Phases

The project will be developed incrementally - target 4 days.
| Day | Task |
| --------- | ---------------------------------------------------------------- |
| **Day 1** | GraphQL fundamentals + inspect project + design schema + Queries |
| **Day 2** | Resolver → Service → Repository architecture + Mutations |
| **Day 3** | React + Apollo Client + queries/mutations + cache/loading/errors |
| **Day 4** | Validation + error handling + testing + production concerns |

## 12. Future Database Migration

One of the architectural goals is to understand how the application could evolve.

Current implementation

```
GraphQL
↓
Service
↓
Repository
↓
data.js
```

Future implementation

```
GraphQL
↓
Service
↓
Repository
↓
PostgreSQL
```

Ideally, the GraphQL and service layers should not need major changes simply because the persistence mechanism changed.

This is one of the reasons for introducing the repository boundary.

## 13. Engineering Principles

Throughout the project we will favor:

- Clear naming over clever naming
- Small focused functions
- Single responsibility
- Explicit dependencies
- Thin resolvers
- Business logic in services
- Data access in repositories
- Consistent error handling
- Input validation
- Reusable GraphQL types
- Separation between API and implementation details
- Tests around important behavior
- Incremental abstraction

We will also avoid premature complexity.

For example, we will not introduce:

10 abstraction layers
complex dependency injection
multiple design patterns
unnecessary utilities

unless there is a genuine reason to do so.

The architecture should evolve with the application's needs.

## 14. Development Tracker/ Status

```
[ ] Phase 1 — Inspect StackBlitz template
[ ] Phase 2 — Create Book domain
[ ] Phase 3 — Design GraphQL schema
[ ] Phase 4 — Implement queries
[ ] Phase 5 — Introduce repository
[ ] Phase 6 — Introduce service
[ ] Phase 7 — Implement mutations
[ ] Phase 8 — Build React frontend
[ ] Phase 9 — Improve error handling
[ ] Phase 10 — Add tests
[ ] Phase 11 — Production-oriented improvements
```

We should complete the phases sequentially and avoid jumping ahead unless there is a good reason.

## 17. Technology Stack

Initial planned stack:

**Frontend**

- React
- Apollo Client

**Backend**

- Node.js
- GraphQL
- Apollo Server

**Data**

- JavaScript in-memory array
- No database or ORM will be used initially.

## 18. Final Target Architecture

The final conceptual architecture is:

```
                         CLIENT
┌───────────────────────────────────────────────┐
│                    React                      │
│                                               │
│  Pages → Components → Apollo Client           │
└──────────────────────┬────────────────────────┘
                       │
                       │ GraphQL
                       ▼
                         API
┌───────────────────────────────────────────────┐
│                GraphQL Layer                  │
│                                               │
│  Schema → Queries → Mutations → Resolvers     │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
                   APPLICATION
┌───────────────────────────────────────────────┐
│                Service Layer                  │
│                                               │
│        Business / Application Logic           │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
                     DATA
┌───────────────────────────────────────────────┐
│              Repository Layer                 │
│                                               │
│             Data Access Logic                 │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│                   data.js                     │
│                                               │
│              In-memory books[]                │
└───────────────────────────────────────────────┘

```

The architecture is intentionally designed so that the final data source can eventually be replaced:

```
data.js
↓
PostgreSQL
↓
MongoDB
↓
Another persistence layer
```
