const mongoose = require("mongoose");

exports.priceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    price: {
      type: Number,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
  },
  { timestamps: true, collection: "Prices" }
);
