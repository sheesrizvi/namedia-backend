const express = require("express");
const router = express.Router();
const Driver = require("../models/driverModel");


router.post("/register-token", async (req, res) => {
  const user = await Driver.findById(req.body.user._id);

  if (!user) return res.status(400).send({ error: "Invalid user." });
  user.pushToken = req.body.token;

  const updatedUser = await user.save();
  res.status(201).send();
});


module.exports = router;
