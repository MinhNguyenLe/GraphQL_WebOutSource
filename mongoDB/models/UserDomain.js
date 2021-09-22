const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.userDomain = new mongoose.Schema(
  {
    idProduct: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    nameUrl: {
      type: String,
      default: "example",
    },
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    dot: {
      type: String,
      default: ".com",
    },
  },
  { timestamps: true, collection: "UserDomain" }
);
