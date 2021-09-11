require("dotenv").config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "../data/resolvers.graphql";
import { typeDefs } from "../data/schema.graphql";

const PORT = process.env.PORT || 404;

// Connect to DB
const db = require("../connectMongoDB");
db.connect();

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.get("/", (req, res) => {
  console.log("Apollo GraphQL Express server is ready");
});

app.listen({ port: PORT }, () => {
  console.log(`Server is running at ${PORT}`);
});
