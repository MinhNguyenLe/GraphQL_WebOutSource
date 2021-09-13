const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.serverSchema = new mongoose.Schema(
  {
    HDD: {
      type: String,
    },
    bandwidth: {
      type: String,
    },
    RAM: {
      type: String,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    CPU: {
      type: String,
    },
    typeServer: {
      type: String,
    },
  },
  { timestamps: true, collection: "Servers" }
);
