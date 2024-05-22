const express = require("express");


const { admin } = require("../middleware/authmiddleware");
const { createTrip, getTripsbyDriver } = require("../controller/tripController");
const router = express.Router();

router.route("/create").post(createTrip);
router.route("/get").get(getTripsbyDriver);


module.exports = router;