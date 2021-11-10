const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    background: {
      type: String,
      default: "",
    },
    isPermission: {
      type: Boolean,
      default: false,
    },
    listIdProduct: {
      type: [{ type: Schema.Types.ObjectId, ref: "UserProduct" }],
    },
  },
  { timestamps: true, collection: "Users" }
);
