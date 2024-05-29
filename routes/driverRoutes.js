const express = require("express");

const { admin } = require("../middleware/authmiddleware");
const {
  authUser,
  registerUser,
  getUsers,
  getUserProfile,
  createLocation,
  getDriverLocation,
} = require("../controller/driverController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/all").get(getUsers);
router.route("/getProfileById").get(getUserProfile);
router.route("/location/create").post(createLocation);
router.route("/location/get").get(getDriverLocation);

module.exports = router;
