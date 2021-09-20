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
      id: user._id,
      isPermission: user.isPermission,
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
    buyers: () => {
      return new Promise((resolve, reject) => {
        db.Buyers.find((err, users) => {
          if (err) reject(err);
          else resolve(users);
        });
      });
    },
  },
  Buyers: {
    user: async (buyer) => {
      let user = [];
      const data = await db.Buyers.find({}).populate("idUser");

      data.filter((item) => {
        if (item.idUser._id.toString() == buyer.idUser.toString()) {
          user.push(item.idUser);
        }
      });
      return user[0];
    },
  },
  Mutation: {
    login: async (_, { login: { email, password } }) => {
      const { valid, errors } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
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
      console.log(user);
      if (!user.isPermission) {
        const buyer = await db.Buyers.findOne({ idUser: user._id });
        console.log(buyer);
        return {
          ...buyer._doc,
          token,
        };
      }
    },
    register: async (
      _,
      { register: { userName, email, password, quantity, name } }
    ) => {
      const { valid, errors } = validateRegisterInput(
        userName,
        email,
        password,
        quantity,
        name
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      try {
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
        const resUser = await newUser.save();

        const buyer = await db.Buyers.findOne({ name });
        if (buyer) {
          throw new UserInputError("Name existed", {
            errors: {
              userName: "Name existed",
            },
          });
        }

        const newBuyer = new db.Buyers({
          idUser: resUser._id,
          name: name,
          quantity: quantity,
          typeBuyer: quantity < 11 ? 1 : 2,
        });
        const res = await newBuyer.save();
        const token = generateToken(resUser);
        console.log(res);
        return {
          ...res._doc,
          token,
        };
      } catch (err) {
        console.log("Err server", err);
      }
    },
  },
};
