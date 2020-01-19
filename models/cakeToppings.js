const { Schema, model } = require("mongoose");

const cakeToppingsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = model("cakeToppings", cakeToppingsSchema);
