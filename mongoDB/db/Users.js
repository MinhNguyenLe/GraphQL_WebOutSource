// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.Users = void 0;

const mongoose = require("mongoose");

exports.usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    job: {
      type: String,
    },
    fullName: {
      type: String,
    },
    userName: {
      type: String,
    },
    isPermission: {
      type: Boolean,
    },
    phone: {
      type: String,
    },
    information: {
      type: String,
    },
  },
  { timestamps: true, collection: "Users" }
);
