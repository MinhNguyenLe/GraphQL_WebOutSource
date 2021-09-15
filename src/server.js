require("dotenv").config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "../data/resolvers.js";
import { typeDefs } from "../data/schema.js";

import cors from "cors";

const PORT = process.env.PORT || 404;

// Connect to DB
const db = require("../mongoDB");
db.connect();

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const corsOptions = {
  exposedHeaders: ["x-access-token", "x-refresh-token"],
};
app.use(cors());

app.get("/", (req, res) => {
  console.log("Apollo GraphQL Express server is ready");
});

app.listen({ port: PORT }, () => {
  console.log(
    `Server is running at http://localhost:${PORT}${server.graphqlPath}`
  );
});
