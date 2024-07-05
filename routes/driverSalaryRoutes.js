const express = require("express");
const { createSalaryStructure, updateSalaryStructure, getStructureByDriver, getSalaryByDriverMonthly, getGeneratedSalary, generateSalary } = require("../controller/driverSalaryController");


const router = express.Router();

router.route("/create-structure").post(createSalaryStructure);
router.route("/update-structure").post(updateSalaryStructure);
router.route("/structure-by-driver").get(getStructureByDriver);
router.route("/employee-monthly").get(getSalaryByDriverMonthly);
router.route("/generated").get(getGeneratedSalary);
router.route("/generate-salary").post(generateSalary);

module.exports = router;
