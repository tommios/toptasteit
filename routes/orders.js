const { Router } = require("express");
const Order = require("../models/order");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", auth, async (req, res) => {
  const orders = await Order.find({}).populate(); // !!!

  try {
    res.render("orders", {
      title: "Заказы",
      isOrders: true,
      orders: orders.map(ord => {
        return {
          ...ord._doc
        };
      })
    });
  } catch (err) {
    console.log(err);
  }
});

// router.post("/", auth, async (req, res) => {
//   try {
//     const user = await req.user.populate("cart.items.productId").execPopulate();

//     const products = user.cart.items.map(i => ({
//       count: i.count,
//       product: { ...i.productId._doc }
//     }));

//     const order = new Order({
//       user: {
//         name: req.user.name,
//         userId: req.user
//       },
//       products: products
//     });

//     await order.save();
//     await req.user.clearCart();

//     res.redirect("/orders");
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
