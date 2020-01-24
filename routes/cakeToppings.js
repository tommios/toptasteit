const { Router } = require("express");
const auth = require("../middleware/auth");
const { validationResult } = require("express-validator");
const CakeToppings = require("../models/cakeToppings");

const router = Router();

function isOwner(cakeToppings, req) {
  return cakeToppings.userId.toString() === req.user._id.toString();
}

router.get("/", async (req, res) => {
  try {
    const { id } = req.body;
    const cakeToppings = await CakeToppings.find().populate("userId");

    res.render("cakeToppings", {
      title: "Начинки для тортов",
      isCakeToppings: true,
      userId: req.user ? req.user._id.toString() : null,
      cakeToppings
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id/edit", auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/cakeToppings");
  }

  try {
    const cakeToppings = await CakeToppings.findById(req.params.id);

    if (!isOwner(cakeToppings, req)) {
      return res.redirect("/cakeToppings");
    }

    res.render("cakeToppings-edit", {
      title: `Редактировать ${cakeToppings.title}`,
      cakeToppings
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/editCakeTopic", auth, async (req, res) => {
  const { id } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).redirect(`${id}/edit?allow=true`);
  }

  try {
    delete req.body.id;
    const cakeToppings = await CakeToppings.findById(id);

    if (req.files.img) {
      cakeToppings.image = req.files.image[0].location;
    }

    if (!isOwner(cakeToppings, req)) {
      return res.redirect("/cakeToppings");
    }

    Object.assign(cakeToppings, req.body);
    await cakeToppings.save();

    res.redirect("/cakeToppings");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
