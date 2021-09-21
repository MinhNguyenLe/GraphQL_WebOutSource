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

  type Promotions {
    _id: ID!
    price: Float!
    months: Int!
    description: String
    # expiry: Date!
  }

  type Products {
    _id: ID!
    price: Float!
    months: Int!
    idPromotion: Promotions
    createdAt: String
  }

  type Domains {
    _id: ID!
    dot: String!
    information: String!
    product: Products!
    images: [String!]!
    createdAt: String
  }

  input Register {
    email: String!
    password: String!
    userName: String!
    name: String!
    quantity: Int!
  }

  input CreateDomain {
    dot: String!
    information: String!
    images: String!
    price: Float!
    months: Int!
  }

  input Login {
    email: String!
    password: String!
  }

  type Query {
    users: [Users]
    buyers: [Buyers]
    domains: [Domains]
  }

  type Mutation {
    register(register: Register): Buyers!
    login(login: Login): Buyers!
    createDomain(createDomain: CreateDomain): Domains!
  }
`;
