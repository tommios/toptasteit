const { Router } = require("express");
const CakeToppings = require("../models/cakeToppings");
const auth = require("../middleware/auth");

const router = Router();

router.get("/", async (req, res) => {
  res.render("addCakeToppings", {
    title: "Добавить"
  });
});

router.post("/", async (req, res) => {
  try {
    const cakeToppingsData = {
      title: req.body.title,
      text: req.body.text,
      image: req.files.image[0].location,
      userId: req.user
    };

    const cakeToppings = new CakeToppings(cakeToppingsData);
    await cakeToppings.save();
    res.redirect("/cakeToppings");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
