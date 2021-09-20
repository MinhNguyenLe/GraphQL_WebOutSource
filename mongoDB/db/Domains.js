const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.domainSchema = new mongoose.Schema(
  {
    idProduct: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    nameUrl: {
      type: String,
    },
    userDomain: {
      type: String,
    },
    dot: {
      type: String,
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
