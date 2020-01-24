const { Router } = require("express");
const Product = require("../models/product");
const auth = require("../middleware/auth");
const { validationResult } = require("express-validator");
const { productValidators } = require("../utils/validators");

const router = Router();

function counterFunction() {
  // проверяем не задана ли уже эта переменная значением
  if (typeof counterFunction.counter == "undefined") {
    // если нет ставим в ноль
    counterFunction.counter = 0;
  }
  return ++counterFunction.counter;
}

router.get("/", auth, (req, res) => {
  res.render("add", {
    title: "Добавить",
    isAdd: true
  });
});

router.post("/", auth, productValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("add", {
      title: "Добавить",
      isAdd: true,
      error: errors.array()[0].msg,
      data: {
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        calorie: req.body.calorie,
        price: req.body.price,
        img: req.body.img
      }
    });
  }

  const products = await Product.find();

  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients,
    calorie: req.body.calorie,
    vendorCode: counterFunction(),
    price: req.body.price,
    img: req.files.img[0].location,
    userId: req.user
  });

  try {
    await product.save();
    res.redirect("/products");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
