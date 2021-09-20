import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Users {
    _id: ID
    email: String!
    password: String!
    job: String
    fullName: String
    userName: String!
    isPermission: Boolean
    phone: String
    information: String
    buyer: [Buyers]
  }

  type Buyers {
    token: String
    _id: ID!
    user: Users!
    typeBuyer: Int!
    name: String!
    createdAt: String
    quantity: Int!
  }

  type Admins {
    _id: ID!
    email: String!
    password: String!
    fullName: String
    userName: String!
    isPermission: Boolean!
    phone: String!
    information: String!
  }

  input Register {
    email: String!
    password: String!
    userName: String!
    name: String!
    quantity: Int!
  }

  input Login {
    email: String!
    password: String!
  }

  type Query {
    users: [Users]
    buyers: [Buyers]
  }

  type Mutation {
    register(register: Register): Buyers!
    login(login: Login): Users!
  }
`;
