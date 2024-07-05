const express = require("express");
const { createpresentlogin, createpresentlogout, createabsent, getattendanceByDriver, getAllattendanceByDriver } = require("../controller/driverAttendanceController");


const router = express.Router();

router.route("/present-login").post(createpresentlogin);
router.route("/present-logout").post(createpresentlogout);
router.route("/absent").post(createabsent);
router.route("/by-driver").get(getattendanceByDriver);
router.route("/all-by-driver").get(getAllattendanceByDriver);

module.exports = router;
