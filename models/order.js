const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  product: {
    type: Object,
    default: {}
  },
  user: {
    name: String,
    phone: String,
    email: String,
    date: String,
    theme: String,
    information: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = model("Order", orderSchema);
