const express = require("express");


const { admin } = require("../middleware/authmiddleware");
const router = express.Router();

router.route("/1/").post();
router.route("/login").post();


module.exports = router;