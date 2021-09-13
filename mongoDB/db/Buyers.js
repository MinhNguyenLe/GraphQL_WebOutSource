const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.buyerSchema = new mongoose.Schema(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    typeBuyer: {
      type: Number,
    },
  },
  { timestamps: true, collection: "Buyers" }
);
