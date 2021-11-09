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
    userName: {
      type: String,
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
