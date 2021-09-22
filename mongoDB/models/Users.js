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
      default: "",
    },
    fullName: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
    },
    isPermission: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      default: "",
    },
    information: {
      type: String,
      default: "",
    },
    listIdProduct: {
      type: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    },
  },
  { timestamps: true, collection: "Users" }
);
