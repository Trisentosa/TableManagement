const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
var ObjectId = require("mongodb").ObjectId;
var { validateUser } = require("../middlewares");

router.route("/register").post(validateUser, async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const result = await user.save();
    const { password, ...data } = await result.toJSON();

    res.send(data);
  } catch (error) {
    return res.status(406).send({ message: "Email already exist" });
  }
});

router.route("/login").post(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({ message: "User Not Found!" });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send({ message: "Invalid credentials" });
  }

  //save token in http only cookie, we don't want to return the cookie
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  res.cookie("jwt", token, {
    httpOnly: true, //more secure, backend only
    maxAge: 24 * 60 * 60 * 1000, // 1 day in millisecond
  });

  res.send({ message: "SUCCESS" });
});

router.get("/user", async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, process.env.SECRET);
    if (!claims) {
      //where cookie is invalid
      return res.status(401).send({
        message: "unauthenticated",
      });
    }
    const o_id = new ObjectId(claims._id);
    const user = await User.findOne({ _id: o_id });
    const { password, ...data } = await user.toJSON();

    res.send(data);
  } catch (error) {
    //where no cookie at all
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
});

// remove cookie by set the cookie again
router.post("/logout", async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({ message: "success" });
});

module.exports = router;
