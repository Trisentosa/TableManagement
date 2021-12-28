const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  etd: {
    type: Date,
    required: true,
  },
  eta: {
    type: Date,
    required: true,
  },
});

const model = mongoose.model("entry", entrySchema);

module.exports = model;
