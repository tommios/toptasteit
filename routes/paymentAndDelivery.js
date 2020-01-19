const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.render("paymentAndDelivery", {
    title: "Оплата и доставка",
    isPay: true
  });
});

module.exports = router;
