const express = require("express");


const { admin } = require("../middleware/authmiddleware");
const { authUser, registerUser } = require("../controller/driverController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);


module.exports = router;