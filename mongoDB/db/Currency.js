const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.priceSchema = new mongoose.Schema(
  {
    type: {
      type: String, //1:$ 2:VND
    },
    rate: {
      type: Number,
    },
  },
  { timestamps: true, collection: "Currency" }
);
