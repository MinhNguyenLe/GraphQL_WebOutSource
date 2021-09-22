const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.domainSchema = new mongoose.Schema(
  {
    idProduct: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    dot: {
      type: String,
      default: ".com",
    },
    information: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, collection: "Domains" }
);
