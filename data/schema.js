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

  type Hosting {
    _id: ID!
    SSDMemory: String!
    type: String!
    RAM: String!
    product: Products!
    bandwidth: String!
    createdAt: String
  }

  type VPS {
    _id: ID!
    cloudStorage: String!
    type: String!
    RAM: String!
    CPU: String!
    product: Products!
    bandwidth: String!
    createdAt: String
  }

  type Servers {
    _id: ID!
    HDD: String!
    type: String!
    RAM: String!
    CPU: String!
    product: Products!
    bandwidth: String!
    createdAt: String
  }

  input Register {
    email: String!
    password: String!
    userName: String!
    name: String!
    quantity: Int!
  }

  input CreateHosting {
    SSDMemory: String!
    type: String!
    RAM: String!
    bandwidth: String!
    price: Float!
    months: Int!
  }
  input CreateVPS {
    cloudStorage: String!
    type: String!
    RAM: String!
    bandwidth: String!
    CPU: String!
    price: Float!
    months: Int!
  }
  input CreateServer {
    HDD: String!
    type: String!
    RAM: String!
    bandwidth: String!
    CPU: String!
    price: Float!
    months: Int!
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
    hosting: [Hosting]
    vps: [VPS]
    servers: [Servers]
  }

  type Mutation {
    register(register: Register): Buyers!
    login(login: Login): Buyers!
    createDomain(createDomain: CreateDomain): Domains!
    createHosting(createHosting: CreateHosting): Hosting!
    createVPS(createVPS: CreateVPS): VPS!
    createServer(createServer: CreateServer): Servers!
  }
`;
