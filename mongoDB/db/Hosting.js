const mongoose = require("mongoose");

exports.hostingSchema = new mongoose.Schema(
  {
    idProduct: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    SSDMemory: {
      type: String,
    },
    typeHosting: {
      type: Number,
    },
    RAM: {
      type: String,
    },
    bandwidth: {
      type: String,
    },
  },
  { timestamps: true, collection: "Hosting" }
);
