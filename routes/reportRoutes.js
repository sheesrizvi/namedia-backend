const express = require("express");
const { createReport, createReportGram, createMonthlyReport, approveReport, updateReport, updateReportGram, getUnApprovedReport } = require("../controller/reportController");
const router = express.Router();

router.route("/report").post(createReport);
router.route("/report-gram").post(createReportGram);
router.route("/approve").post(approveReport);
router.route("/get/report").get(createMonthlyReport);
router.route("/unapproved").get(getUnApprovedReport);
router.route("/update/report").post(updateReport);
router.route("/update/report-gram").post(updateReportGram);


module.exports = router;