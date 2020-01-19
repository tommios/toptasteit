const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  ingredients: {
    type: String,
    default: ""
  },
  calorie: {
    type: Number,
    default: 0
  },
  vendorCode: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: true
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

productSchema.method("toClient", function() {
  const product = this.toObject();
  product.id = product._id;

  delete product._id;
  return product;
});

module.exports = model("Product", productSchema);
