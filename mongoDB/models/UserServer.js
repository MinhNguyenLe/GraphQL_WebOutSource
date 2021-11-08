const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.userServer = new mongoose.Schema(
  {
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
    idUserProduct: {
      type: Schema.Types.ObjectId,
      ref: "UserProduct",
    },
    CPU: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    support: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, collection: "UserServer" }
);
