const asyncHandler = require("express-async-handler");
const SalaryStructure = require("../models/salaryStructureModel");
const Salary = require("../models/salaryModel");
const Attendance = require("../models/attendanceModel");
const { endOfMonth, startOfMonth } = require("date-fns");

const createSalaryStructure = asyncHandler(async (req, res) => {
  const { employee, basic, hra, tele, ta, esi, pf, total } = req.body;

  const salarystructure = await SalaryStructure.create({
    employee,
    basic,
    hra,
    tele,
    ta,
    esi,
    pf,
    total,
  });
  if (salarystructure) {
    res.json(salarystructure);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});
const generateSalary = asyncHandler(async (req, res) => {
  const { employee, salaryStructure, dateofmonth, month } = req.body;
  const s1 = parseISO(dateofmonth);
  const salarystructure = await SalaryStructure.findById({ salaryStructure });
  const absent = await Attendance.CountDocuments({
    $and: [
      { type: "absent" },
      {
        date: {
          $gte: startOfMonth(s1),
          $lte: endOfMonth(s1),
        },
      },
    ],
  });
  const deduction = (salarystructure.total / 30) * absent;
  const amount = salarystructure.total - deduction;
  const salary = await Salary.create({
    employee,
    salaryStructure,
    month,
    amount,
  });
  if (salary) {
    res.json(salary);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

module.exports = { createSalaryStructure, generateSalary };
