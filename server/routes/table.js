const express = require("express");
const router = express.Router();
const Entry = require("../models/entry.model");
const { isLoggedIn } = require("../middlewares");

router.route("/create").post(isLoggedIn, async (req, res) => {
  try {
    const entry = new Entry({
      company: req.body.company,
      product: req.body.product,
      quantity: req.body.quantity,
      etd: new Date(req.body.etd),
      eta: new Date(req.body.eta),
    });
    const result = await entry.save();
    res.send(result);
  } catch (error) {
    res.status(400).send({ message: "Invalid entry inputs" });
  }
});

router.route("/update").post(isLoggedIn, async (req, res) => {
  try {
    const id = req.body.id;
    const entryToEdit = await Entry.findByIdAndUpdate(id, {
      company: req.body.company,
      product: req.body.product,
      quantity: req.body.quantity,
      etd: new Date(req.body.etd),
      eta: new Date(req.body.eta),
    });
    await entryToEdit.save();
    res.send(entryToEdit);
  } catch (error) {
    res.status(400).send({ message: "Update fails!" });
  }
});

router.route("/delete").post(isLoggedIn, async (req, res) => {
  try {
    const id = req.body.id;
    await Entry.findByIdAndRemove(id);
    res.send({ message: "Deleted entry successfully" });
  } catch (error) {
    res.status(400).send({ message: "Delete entry failed" });
  }
});

router.route("/getAll").get(isLoggedIn, async (req, res) => {
  try {
    const entries = await Entry.find({});
    res.send(entries);
  } catch (error) {
    res.status(401).send({ message: "Unauthenticated, couldn't get entries!" });
  }
});

module.exports = router;
