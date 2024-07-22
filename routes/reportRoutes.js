const express = require("express");
const {
  createReport,
  createMonthlyReport,
  approveReport,
  getUnApprovedReport,
  getData,
} = require("../controller/reportController");
const router = express.Router();

router.route("/report").post(createReport);

router.route("/approve").post(approveReport);
router.route("/get/report").get(createMonthlyReport);
router.route("/data").get(getData);
router.route("/unapproved").get(getUnApprovedReport);

module.exports = router;
