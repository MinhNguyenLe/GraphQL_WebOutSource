const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.serverSchema = new mongoose.Schema(
  {
    HDD: {
      type: String,
      default: "",
    },
    bandwidth: {
      type: String,
      default: "",
    },
    RAM: {
      type: String,
      default: "",
    },
    idProduct: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    CPU: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, collection: "Servers" }
);
