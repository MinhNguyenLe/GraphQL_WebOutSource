const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.buyerSchema = new mongoose.Schema(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    typeBuyer: {
      type: Number, // 1 :team (small) 2 :business (lard)
    },
    cart: {
      type: [String],
      default: [],
    },
    name: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true, collection: "Buyers" }
);
