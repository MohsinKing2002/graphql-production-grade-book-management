import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation CreateBook($input: CreateBookInput!) {
    createBook(input: $input) {
      id
      title
      author
      publishedYear
    }
  }
`;
