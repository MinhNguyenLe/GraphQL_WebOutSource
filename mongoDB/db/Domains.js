const mongoose = require("mongoose");

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
  },
  { timestamps: true, collection: "Domains" }
);
