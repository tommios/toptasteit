const { Router } = require("express");
const Product = require("../models/product");
const auth = require("../middleware/auth");
const { validationResult } = require("express-validator");
const { productValidators } = require("../utils/validators");
const router = Router();

function isOwner(product, req) {
  return product.userId.toString() === req.user._id.toString();
}

router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("userId", "email name")
      .select("price title img vendorCode");

    res.render("products", {
      title: "Каталог",
      isProducts: true,
      userId: req.user ? req.user._id.toString() : null,
      products
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id/edit", auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }

  try {
    const product = await Product.findById(req.params.id);

    if (!isOwner(product, req)) {
      return res.redirect("/products");
    }

    res.render("product-edit", {
      title: `Редактировать ${product.title}`,
      product
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.render("product", {
      layout: "empty",
      title: `Торт ${product.title}`,
      product
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/edit", auth, productValidators, async (req, res) => {
  const { id } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).redirect(`${id}/edit?allow=true`);
  }

  try {
    delete req.body.id;
    const product = await Product.findById(id);

    if (req.files.img) {
      product.img = req.files.img[0].location;
    }

    if (!isOwner(product, req)) {
      return res.redirect("/products");
    }

    Object.assign(product, req.body);
    await product.save();

    res.redirect("/products");
  } catch (err) {
    console.log(err);
  }
});

router.post("/remove", auth, async (req, res) => {
  try {
    const product = Product.findById(req.body.id);
    await product.deleteOne({
      _id: req.body.id,
      userId: req.user._id
    });
    res.redirect("/products");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
