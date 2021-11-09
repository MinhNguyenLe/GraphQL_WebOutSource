require("dotenv").config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "../graphql/resolvers.js";
import { typeDefs } from "../graphql/schema.js";

const checkAuth = require("../util/check-auth");

import cors from "cors";

const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const PORT = process.env.PORT || 404;

// Connect to DB
const db = require("../mongoDB");
db.connect();

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
const corsOptions = {
  exposedHeaders: ["x-access-token", "x-refresh-token"],
};
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { items } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
  }
});

server.applyMiddleware({ app });

// app.use(checkAuth);

app.get("/", (req, res) => {
  console.log("Apollo GraphQL Express server is ready");
});

app.listen({ port: PORT }, () => {
  console.log(
    `Server is running at http://localhost:${PORT}${server.graphqlPath}`
  );
});
