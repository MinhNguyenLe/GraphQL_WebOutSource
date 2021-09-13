const mongoose = require("mongoose");

exports.sourcecodeSchema = new mongoose.Schema(
  {
    typeTechnical: {
      type: [String],
    },
    feature: {
      type: [String],
    },
    description: {
      type: String,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    images: {
      type: [String],
    },
    typeBusiness: {
      type: [String],
    },
  },
  { timestamps: true, collection: "SourceCode" }
);
