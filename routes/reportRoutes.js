const express = require("express");
const { createReport, createMonthlyReport, approveReport,  getUnApprovedReport } = require("../controller/reportController");
const router = express.Router();

router.route("/report").post(createReport);

router.route("/approve").post(approveReport);
router.route("/get/report").get(createMonthlyReport);
router.route("/unapproved").get(getUnApprovedReport);




module.exports = router;