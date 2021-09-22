const mongoose = require("mongoose");
const Schema = mongoose.Schema;

exports.adminSchema = new mongoose.Schema(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    typeAdmin: {
      type: Number,
    },
  },
  { timestamps: true, collection: "Admins" }
);
