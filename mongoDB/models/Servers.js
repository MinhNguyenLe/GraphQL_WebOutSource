const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.serverSchema = new mongoose.Schema(
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
    CPU: {
      type: String,
      default: "",
    },
    HDD: {
      type: String,
      default: "",
    },
    SSD: {
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
    timeSetup: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, collection: "Servers" }
);
