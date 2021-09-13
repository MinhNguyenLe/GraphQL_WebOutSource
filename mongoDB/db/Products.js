const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.productSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
    },
    subPrice: {
      type: [Object],
    },
    idPromotion: {
      type: Schema.Types.ObjectId,
      ref: "Promotions",
    },
    currency: {
      type: String,
    },
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    expiry: {
      type: Date,
    },
    userExpiry: {
      type: Date,
    },
  },
  { timestamps: true, collection: "Products" }
);
