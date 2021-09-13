const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.buyerSchema = new mongoose.Schema(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    typeBuyer: {
      type: Number,
    },
    cart: {
      type: [String],
    },
    nameCompany: {
      type: String,
    },
    quantity: {
      type: Number,
    },
  },
  { timestamps: true, collection: "Buyers" }
);
