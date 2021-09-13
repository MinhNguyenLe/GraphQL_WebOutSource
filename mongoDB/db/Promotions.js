const mongoose = require("mongoose");

exports.promotionSchema = new mongoose.Schema(
  {
    expiry: {
      type: Date,
    },
    description: {
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
  { timestamps: true, collection: "Promotions" }
);
