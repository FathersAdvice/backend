import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      avatar
      email
      password
      username
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser(
    $username: String!
    $email: String!
    $password: String!
    $avatar: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      avatar: $avatar
    ) {
      status
      msg
    }
  }
`;
