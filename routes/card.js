const { Router } = require("express");
const Product = require("../models/product");
const auth = require("../middleware/auth");
const router = Router();

// function mapCartItems(cart) {
//   return cart.items.map(c => ({
//     ...c.productId._doc,
//     id: c.productId.id,
//     count: c.count
//   }));
// }

// function computePrice(products) {
//   return products.reduce((total, product) => {
//     return (total += product.price * product.count);
//   }, 0);
// }

// router.post("/add", auth, async (req, res) => {
//   const product = await Product.findById(req.body.id);
//   await req.user.addToCart(product);

//   res.redirect("/card");
// });

// router.get("/", auth, async (req, res) => {
//   const user = await req.user.populate("cart.items.productId").execPopulate();

//   const products = mapCartItems(user.cart);

//   res.render("card", {
//     title: "Корзина",
//     isCard: true,
//     products: products,
//     price: computePrice(products)
//   });
// });

// router.delete("/remove/:id", auth, async (req, res) => {
//   await req.user.removeFromCart(req.params.id);

//   const user = await req.user.populate("cart.items.productId").execPopulate();

//   const products = mapCartItems(user.cart);
//   const cart = {
//     products: products,
//     price: computePrice(products)
//   };

//   res.status(200).json(cart);
// });

module.exports = router;
