const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.projectSchema = new mongoose.Schema(
  {
    idProduct: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    description: {
      type: String,
    },
    typeBusiness: {
      type: [String],
    },
    images: {
      type: [String],
    },
    typeTechnical: {
      type: [String],
    },
  },
  { timestamps: true, collection: "Projects" }
);
