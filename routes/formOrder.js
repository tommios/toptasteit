const { Router } = require("express");
const Order = require("../models/order");
const Product = require("../models/product");

const router = Router();

router.get("/", (req, res) => {
  res.render("formOrder", {
    title: "Форма заказа",
    isFormOrder: true
  });
});

router.get("/orderSuccess", async (req, res) => {
  const newOrder = await Order.findById(req.session.newOrder._id);

  res.render("orderSuccess", {
    title: "Спасибо за Ваш заказ",
    newOrder
  });
});

router.post("/", async (req, res) => {
  const product = await Product.findById(req.body.id);

  res.render("formOrder", {
    title: "Форма заказа",
    isFormOrder: true,
    product
  });
});

router.post("/add", async (req, res) => {
  const product = await Product.findById(req.body.product);
  const order = new Order({
    user: {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      date: req.body.date,
      theme: req.body.theme,
      information: req.body.information
    },
    product
  });

  await order.save();
  req.session.newOrder = order;
  req.session.save(err => {
    if (err) {
      throw err;
    }
    res.redirect("/formOrder/orderSuccess");
  });
});

module.exports = router;
