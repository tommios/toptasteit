const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.render("foods-calorie", {
    title: "Таблица калорийности продуктов",
    isFoods: true
  });
});

module.exports = router;
