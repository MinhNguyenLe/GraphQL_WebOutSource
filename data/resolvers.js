require("dotenv").config();

import * as db from "../mongoDB/db";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../util/validators");

const { UserInputError } = require("apollo-server");
// const {
//   validateRegisterInput,
//   validateLoginInput,
// } = require("../../util/validators");
const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

export const resolvers = {
  Query: {
    users: () => {
      return new Promise((resolve, reject) => {
        db.Users.find((err, users) => {
          if (err) reject(err);
          else resolve(users);
        });
      });
    },
    async admins() {
      try {
        const posts = await db.Users.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { login: { email, password } }) {
      const { valid, errors } = validateLoginInput(email, password);

      const user = await db.Users.findOne({ email });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("Wrong information", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Password incorrect";
        throw new UserInputError("Password incorrect", { errors });
      }
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(_, { register: { userName, email, password } }) {
      const { valid, errors } = validateRegisterInput(
        userName,
        email,
        password
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await db.Users.findOne({ userName });
      if (user) {
        throw new UserInputError("User name existed", {
          errors: {
            userName: "user name existed",
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new db.Users({
        email,
        userName,
        password,
      });

      const res = await newUser.save();

      const token = generateToken(res);
      return {
        ...res._doc,
        token,
      };
    },
  },
};
