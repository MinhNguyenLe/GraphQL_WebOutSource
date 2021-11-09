import { gql } from "apollo-server-express";

export const typeDefs = gql`
  #  user == account, buyer/admin === information user

  type Users {
    _id: ID!
    email: String!
    password: String!
    userName: String!
    isPermission: Boolean!
    listIdProduct: [UserProduct]!
    buyer: Buyers!
    createdAt: String!
    token: String!
  }

  type Buyers {
    _id: ID!
    user: Users!
    name: String!
    type: String!
    information: String!
    contact: String!
    quantity: Int!
    createdAt: String!
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
    name: String!
    domain: String!
    website: String!
    support: [String]!
    SSDMemory: String!
    type: String!
    RAM: String!
    product: Products!
    bandwidth: String!
    information: String!
    createdAt: String
  }

  type VPS {
    _id: ID!
    name: String!
    domain: String!
    information: String!
    support: [String]!
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
    name: String!
    information: String!
    support: [String]!
    timeSetup: String!
    SSD: String!
    HDD: String!
    type: String!
    RAM: String!
    CPU: String!
    product: Products!
    bandwidth: String!
    createdAt: String!
  }

  input Register {
    email: String!
    password: String!
    userName: String!
    contact: String!
    quantity: Int!
  }

  input CreateHosting {
    name: String!
    domain: String!
    website: String!
    support: [String]!
    SSDMemory: String!
    type: String!
    RAM: String!
    bandwidth: String!
    price: Float!
    months: Int!
    information: String!
  }

  input EditHosting {
    _id: ID!
    name: String!
    domain: String!
    website: String!
    support: [String]!
    SSDMemory: String!
    type: String!
    RAM: String!
    bandwidth: String!
    price: Float!
    months: Int!
    information: String!
  }

  input EditVPS {
    _id: ID!
    name: String!
    domain: String!
    cloudStorage: String!
    support: [String]!
    CPU: String!
    type: String!
    RAM: String!
    bandwidth: String!
    price: Float!
    months: Int!
    information: String!
  }

  input Delete {
    _id: ID!
  }

  input CreateVPS {
    information: String!
    name: String!
    domain: String!
    support: [String]!
    cloudStorage: String!
    type: String!
    RAM: String!
    bandwidth: String!
    CPU: String!
    price: Float!
    months: Int!
  }
  input CreateServer {
    information: String!
    name: String!
    support: [String]!
    SSD: String!
    timeSetup: String!
    HDD: String!
    type: String!
    RAM: String!
    bandwidth: String!
    CPU: String!
    price: Float!
    months: Int!
  }

  input EditServer {
    _id: ID!
    name: String!
    timeSetup: String!
    SSD: String!
    HDD: String!
    support: [String]!
    CPU: String!
    type: String!
    RAM: String!
    bandwidth: String!
    price: Float!
    months: Int!
    information: String!
  }
  input CreateDomain {
    dot: String!
    information: String!
    images: String!
    price: Float!
    months: Int!
  }

  type UserProduct {
    _id: ID!
    price: Float!
    months: Int!
    user: Users!
    createdAt: String!
    type: String!
  }

  type UserDomain {
    _id: ID!
    dot: String!
    nameUrl: String!
    userProduct: UserProduct!
  }

  input CreateUserDomain {
    domain: ID!
    product: ID!
    user: ID!
    nameUrl: String!
  }

  input BuyDomain {
    nameUrl: String!
    _id: ID!
  }

  input BuyHosting {
    hosting: ID!
  }

  input Token {
    token: String!
  }

  # input BuyAllProduct {
  #   domain: [BuyDomain]!
  #   user: ID!
  #   hosting: [BuyHosting!]
  # }

  input Login {
    email: String!
    password: String!
  }

  type Query {
    removeDataInDB: Message!
    users: [Users]
    buyers: [Buyers]
    domains: [Domains]
    hosting: [Hosting]
    vps: [VPS]
    servers: [Servers]
    userDomain: [UserDomain]
  }
  type Message {
    mess: String!
  }
  type Mutation {
    register(register: Register): Users!
    login(login: Login): Users!
    createDomain(createDomain: CreateDomain): Domains!
    createHosting(createHosting: CreateHosting): [Hosting]!
    editHosting(editHosting: EditHosting): [Hosting]!
    deleteHosting(deleteHosting: Delete): [Hosting]!
    createVPS(createVPS: CreateVPS): [VPS]!
    editVPS(editVPS: EditVPS): [VPS]!
    deleteVPS(deleteVPS: Delete): [VPS]!
    createServer(createServer: CreateServer): [Servers]!
    editServer(editServer: EditServer): [Servers]!
    deleteServer(deleteServer: Delete): [Servers]!
    createUserDomain(createUserDomain: CreateUserDomain): UserDomain!
    buyAllProduct(
      user: ID!
      domain: [BuyDomain]!
      hosting: [ID]!
      vps: [ID]!
      server: [ID]!
    ): Users!
    testToken(token: Token): Message!
    cleanAllDB(token: Token): Message!
  }
`;
