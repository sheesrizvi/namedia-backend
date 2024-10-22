const express = require("express");

const {
  authUser,
  registerUser,
  getUsers,
  getUserProfile,
  createLocation,
  getDriverLocation,
  updateUser,
  getDrivers
} = require("../controller/driverController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/update").post(updateUser);
router.route("/login").post(authUser);
router.route("/all").get(getUsers);
router.route("/all-driver").get(getDrivers);
router.route("/getProfileById").get(getUserProfile);
router.route("/location/create").post(createLocation);
router.route("/location/get").get(getDriverLocation);

module.exports = router;
