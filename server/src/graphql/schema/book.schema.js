export const bookTypeDefs = `#graphql
    type Book {
        id: ID!
        title: String!
        author: String!
        publishedYear: Int
    }

    type PaginationInfo {
        page: Int!
        limit: Int!
        totalItems: Int!
        totalPages: Int!
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
    }

    type BookConnection {
        items: [Book!]!
        pagination: PaginationInfo!
    }
    
    input CreateBookInput {
        title: String!
        author: String!
        publishedYear: Int
    }

    input UpdateBookInput {
        title: String
        author: String
        publishedYear: Int
    }

    type Query {
        books(page: Int = 0, limit: Int = 10): BookConnection!
        book(id: ID!): Book
    }

    type Mutation {
        createBook(input: CreateBookInput!): Book!
        updateBook(id: ID!, input: UpdateBookInput!): Book
        deleteBook(id: ID!): Book
    }
`;
