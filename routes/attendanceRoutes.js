const express = require("express");

const { admin } = require("../middleware/authmiddleware");
const {
  createpresentlogin,
  createpresentlogout,
  createabsent,
  getattendanceByEmployee,
} = require("../controller/attendanceController");
const router = express.Router();

router.route("/present-login").post(createpresentlogin);
router.route("/present-logout").post(createpresentlogout);
router.route("/absent").post(createabsent);
router.route("/by-employee").get(getattendanceByEmployee);

module.exports = router;
