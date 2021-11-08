const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.userProduct = new mongoose.Schema(
  {
    price: {
      type: Number,
    },
    type: {
      type: String,
      default: "",
    },
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    months: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true, collection: "UserProduct" }
);
