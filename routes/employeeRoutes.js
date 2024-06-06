const express = require("express");

const {
  registerEmployee,
  authEmployee,
  getEmployees,
  getEmployeeProfile,
} = require("../controller/employeeController");
const router = express.Router();

router.route("/register").post(registerEmployee);
router.route("/login").post(authEmployee);
router.route("/all").get(getEmployees);
router.route("/getProfileById").get(getEmployeeProfile);
module.exports = router;
