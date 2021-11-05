const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.hostingSchema = new mongoose.Schema(
  {
    idProduct: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    information: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "basic", //"pro" "super"
    },
    domain: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    support: {
      type: [String],
      default: [],
    },
    SSDMemory: {
      type: String,
      default: "",
    },
    RAM: {
      type: String,
      default: "",
    },
    bandwidth: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, collection: "Hosting" }
);
