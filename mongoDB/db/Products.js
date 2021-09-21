const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.productSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      default: 0,
    },
    subPrice: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Prices",
        },
      ],
    },
    idPromotion: {
      type: Schema.Types.ObjectId,
      ref: "Promotions",
    },
    months: {
      type: Number,
      default: 12,
    },
  },
  { timestamps: true, collection: "Products" }
);
