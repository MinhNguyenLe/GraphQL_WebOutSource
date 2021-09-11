import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Users {
    _id: ID!
    email: String!
    password: String!
    job: String!
    fullName: String!
    userName: String!
    isPermission: Boolean!
    phone: String!
    information: String!
  }

  type Query {
    users: [Users]
  }
`;
