const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.userVPS = new mongoose.Schema(
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
    idUserProduct: {
      type: Schema.Types.ObjectId,
      ref: "UserProduct",
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
  { timestamps: true, collection: "UserVPS" }
);
