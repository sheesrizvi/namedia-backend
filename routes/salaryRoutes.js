const express = require("express");


const { admin } = require("../middleware/authmiddleware");
const { createSalaryStructure, generateSalary, getStructureByEmployee, updateSalaryStructure } = require("../controller/salaryController");
const router = express.Router();

router.route("/create-structure").post(createSalaryStructure);
router.route("/update-structure").post(updateSalaryStructure);
router.route("/structure-by-employee").get(getStructureByEmployee);
router.route("/generate-salary").post(generateSalary);


module.exports = router;