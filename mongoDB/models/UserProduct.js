const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.userProduct = new mongoose.Schema(
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
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    months: {
      type: Number,
      default: 12,
    },
  },
  { timestamps: true, collection: "UserProduct" }
);
