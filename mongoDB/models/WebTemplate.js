const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.templateSchema = new mongoose.Schema(
  {
    typeBusiness: {
      type: [String],
    },
    typeTechnical: {
      type: [String],
    },
    router: {
      type: [String],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    images: {
      type: [String],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true, collection: "WebTemplate" }
);
