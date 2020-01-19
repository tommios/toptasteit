const { Router } = require("express");
const auth = require("../middleware/auth");
const User = require("../models/user");

const router = Router();

router.get("/", auth, async (req, res) => {
  res.render("profile", {
    title: "Профиль",
    isProfile: true,
    user: req.user.toObject()
  });
});

router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    //console.log(req.body);
    const toChange = {
      name: req.body.name
    };

    //console.log(req.files);
    //console.log(req.files.avatar);
    //console.log(req.files.avatar[0].location);

    if (req.files.avatar) {
      toChange.avatarUrl = req.files.avatar[0].location;
    }

    Object.assign(user, toChange);
    await user.save();
    res.redirect("/profile");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
