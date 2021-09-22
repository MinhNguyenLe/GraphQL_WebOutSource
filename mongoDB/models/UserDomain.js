const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.userDomain = new mongoose.Schema(
  {
    idUserProduct: {
      type: Schema.Types.ObjectId,
      ref: "UserProduct",
    },
    nameUrl: {
      type: String,
      default: "example",
    },
    dot: {
      type: String,
      default: ".com",
    },
  },
  { timestamps: true, collection: "UserDomain" }
);
