const express = require("express");


const { admin } = require("../middleware/authmiddleware");
const { registerEmployee, authEmployee } = require("../controller/employeeController");
const router = express.Router();

router.route("/register").post(registerEmployee);
router.route("/login").post(authEmployee);


module.exports = router;