require("dotenv").config();

import * as models from "../models";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");

const { UserInputError } = require("apollo-server");

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

const user = {
  testToken: async (_, { token: { token } }) => {
    const user = jwt.verify(token, SECRET_KEY);
    console.log(user);
    return { mess: user.id };
  },
  buyers: () => {
    return new Promise((resolve, reject) => {
      models.Buyers.find((err, users) => {
        if (err) reject(err);
        else resolve(users);
      });
    });
  },
  users: async () => {
    return models.Users.find().populate("listIdProduct");
  },
  userAsBuyer: async (buyer) => {
    let user = [];
    const data = await models.Buyers.find({}).populate("idUser");

    data.filter((item) => {
      if (item.idUser._id.toString() == buyer.idUser.toString()) {
        user.push(item.idUser);
      }
    });
    return user[0];
  },
  login: async (_, { login: { email, password } }) => {
    const { valid, errors } = validateLoginInput(email, password);
    if (!valid) {
      throw new UserInputError("Errors", { errors });
    }
    const user = await models.Users.findOne({ email });

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
    if (!user.isPermission) {
      const buyer = await models.Buyers.findOne({ idUser: user._id });
      return {
        ...buyer._doc,
        token,
      };
    }
    //cheat
    const buyer = await models.Buyers.findOne({ idUser: user._id });
    return {
      ...buyer._doc,
      token,
    };
  },
  register: async (
    _,
    { register: { userName, email, password, quantity, contact } }
  ) => {
    const { valid, errors } = validateRegisterInput(
      userName,
      email,
      password,
      quantity,
      contact
    );
    if (!valid) {
      throw new UserInputError("Errors", { errors });
    }
    try {
      const user = await models.Users.findOne({ userName });
      if (user) {
        throw new UserInputError("User name existed", {
          errors: {
            userName: "user name existed",
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new models.Users({
        email,
        userName,
        password,
        // isPermission: true,
      });
      const resUser = await newUser.save();

      const buyer = await models.Buyers.findOne({ email });
      if (buyer) {
        throw new UserInputError("Email existed", {
          errors: {
            userName: "Email existed",
          },
        });
      }

      const newBuyer = new models.Buyers({
        idUser: resUser._id,
        contact: contact,
        quantity: quantity,
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
};

module.exports = user;
