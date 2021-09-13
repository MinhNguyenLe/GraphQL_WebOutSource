const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.userSchema = new mongoose.Schema(
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
