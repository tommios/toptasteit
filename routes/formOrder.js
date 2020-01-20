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
  //console.log(req.session.newOrder._id);

  const newOrder = await Order.findById(req.session.newOrder._id);
  //console.log(newOrder);

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
  // console.log(req.body);
  // console.log(req.user);
  // console.log(req.session);

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
  //console.log(order);

  await order.save();
  req.session.newOrder = order;
  req.session.save(err => {
    if (err) {
      throw err;
    }
    res.redirect("/formOrder/orderSuccess");
  });

  // res.render("orderSuccess", {
  //   title: "Спасибо за Ваш заказ",
  //   order
  // });
});

module.exports = router;
