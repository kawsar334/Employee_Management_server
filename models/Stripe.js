

const mongoose = require("mongoose");

const stripeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
  tokenId:{
      type: String,
      required: true
  }


}, { timestamps: true });

module.exports = mongoose.model("stripe", stripeSchema);
