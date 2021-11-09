const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.buyerSchema = new mongoose.Schema(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    //nameBusiness
    name: {
      type: String,
      default: "",
    },
    //typeBusiness
    type: {
      type: String,
      default: "",
    },
    //informationBusiness
    information: {
      type: String,
      default: "",
    },
    contact: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      default: 10,
    },
  },
  { timestamps: true, collection: "Buyers" }
);
