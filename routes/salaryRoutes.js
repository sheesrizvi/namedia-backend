const express = require("express");

const {
  createSalaryStructure,
  generateSalary,
  getStructureByEmployee,
  updateSalaryStructure,
  getSalaryByEmployeeMonthly,
  getGeneratedSalary,
} = require("../controller/salaryController");
const router = express.Router();

router.route("/create-structure").post(createSalaryStructure);
router.route("/update-structure").post(updateSalaryStructure);
router.route("/structure-by-employee").get(getStructureByEmployee);
router.route("/employee-monthly").get(getSalaryByEmployeeMonthly);
router.route("/generated").get(getGeneratedSalary);
router.route("/generate-salary").post(generateSalary);

module.exports = router;
