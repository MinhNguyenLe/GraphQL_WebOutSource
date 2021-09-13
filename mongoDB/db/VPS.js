const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.vpsSchema = new mongoose.Schema(
  {
    cloudStorage: {
      type: String,
    },
    CPU: {
      type: String,
    },
    bandwidth: {
      type: String,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    RAM: {
      type: String,
    },
    typeVPS: {
      type: String,
    },
  },
  { timestamps: true, collection: "VPS" }
);
