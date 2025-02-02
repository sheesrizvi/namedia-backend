const express = require("express");

const {
  registerEmployee,
  authEmployee,
  getEmployees,
  getEmployeeProfile,
  updateEmployee,
  getAllEmployees,
} = require("../controller/employeeController");
const router = express.Router();

router.route("/register").post(registerEmployee);
router.route("/update").post(updateEmployee);
router.route("/login").post(authEmployee);
router.route("/all").get(getEmployees);
router.route("/all-Employees").get(getAllEmployees);
router.route("/getProfileById").get(getEmployeeProfile);
module.exports = router;
