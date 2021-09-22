const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.priceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: Number,
      default: 1, //1:plus
    },
    price: {
      type: Number,
    },
    // currency: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Currency",
    // },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
  },
  { timestamps: true, collection: "Prices" }
);
