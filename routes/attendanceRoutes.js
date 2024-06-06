const express = require("express");

const {
  createpresentlogin,
  createpresentlogout,
  createabsent,
  getattendanceByEmployee,
  getAllattendanceByEmployee,
} = require("../controller/attendanceController");
const router = express.Router();

router.route("/present-login").post(createpresentlogin);
router.route("/present-logout").post(createpresentlogout);
router.route("/absent").post(createabsent);
router.route("/by-employee").get(getattendanceByEmployee);
router.route("/all-by-employee").get(getAllattendanceByEmployee);

module.exports = router;
