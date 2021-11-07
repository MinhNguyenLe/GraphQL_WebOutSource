const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.vpsSchema = new mongoose.Schema(
  {
    idProduct: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    type: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    information: {
      type: String,
      default: "",
    },
    support: {
      type: [String],
      default: [],
    },
    cloudStorage: {
      type: String,
      default: "",
    },
    RAM: {
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
    domain: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, collection: "VPS" }
);
