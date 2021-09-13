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
    createdAt: String!
    token: String!
  }

  type Buyers {
    idUser: [Users]
    typeBuyer: Int!
    nameCompany: String!
    quantity: Int!
  }

  type Admins {
    email: String!
    password: String!
    fullName: String!
    userName: String!
    isPermission: Boolean!
    phone: String!
    information: String!
  }

  # input Register {
  #   users: [Users]
  #   admins: [Admins]
  #   test: String!
  # }

  type Query {
    users: [Users]
    admins: [Admins]
    test: String!
  }

  # type Mutation {
  #   users: [Users]
  #   admins: [Admins]
  #   test: String!
  # }
`;
