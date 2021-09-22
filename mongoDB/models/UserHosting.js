const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.userHosting = new mongoose.Schema(
  {
    idUserProduct: {
      type: Schema.Types.ObjectId,
      ref: "UserProduct",
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
  { timestamps: true, collection: "UserHosting" }
);
