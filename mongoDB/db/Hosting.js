const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.hostingSchema = new mongoose.Schema(
  {
    idProduct: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    SSDMemory: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "basic", //"pro" "super"
    },
    RAM: {
      type: String,
      default: "",
    },
    bandwidth: {
      type: String,
      default: "",
    },
    isFreeDomain: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: "Hosting" }
);
