const express = require("express");


const { admin } = require("../middleware/authmiddleware");
const { createSalaryStructure, generateSalary } = require("../controller/salaryController");
const router = express.Router();

router.route("/create-structure").post(createSalaryStructure);
router.route("/generate-salary").post(generateSalary);


module.exports = router;