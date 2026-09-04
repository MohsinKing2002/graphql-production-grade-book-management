export const bookTypeDefs = `#graphql
    type Book {
        id: ID!
        title: String!
        author: String!
        publishedYear: Int
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
        books: [Book!]!
        book(id: ID!): Book
    }

    type Mutation {
        createBook(input: CreateBookInput!): Book!
        updateBook(id: ID!, input: UpdateBookInput!): Book
        deleteBook(id: ID!): Book
    }
`;
