const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.vpsSchema = new mongoose.Schema(
  {
    cloudStorage: {
      type: String,
      default: "",
    },
    CPU: {
      type: String,
      default: "",
    },
    bandwidth: {
      type: String,
      default: "",
    },
    idProduct: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    RAM: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, collection: "VPS" }
);
