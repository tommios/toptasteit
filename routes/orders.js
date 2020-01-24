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

module.exports = router;
