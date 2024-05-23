const express = require("express");


const { admin } = require("../middleware/authmiddleware");
const { authUser, registerUser, getUsers } = require("../controller/driverController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/all").get(getUsers);


module.exports = router;