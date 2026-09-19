import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks($page: Int!, $limit: Int!) {
    books(page: $page, limit: $limit) {
      items {
        id
        title
        author
        publishedYear
      }
      pagination {
        page
        limit
        totalItems
        totalPages
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author
      publishedYear
    }
  }
`;
