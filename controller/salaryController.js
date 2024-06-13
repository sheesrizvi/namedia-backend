const asyncHandler = require("express-async-handler");
const SalaryStructure = require("../models/salaryStructureModel");
const Salary = require("../models/salaryModel");
const Attendance = require("../models/attendanceModel");
const { startOfMonth, endOfMonth, parseISO } = require("date-fns");

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
const updateSalaryStructure = asyncHandler(async (req, res) => {
  const { id, basic, hra, tele, ta, esi, pf, total } = req.body;

  const salarystructure = await SalaryStructure.findById(id);

  if (salarystructure) {
    salarystructure.basic = basic;
    salarystructure.hra = hra;
    salarystructure.tele = tele;
    salarystructure.ta = ta;
    salarystructure.esi = esi;
    salarystructure.pf = pf;
    salarystructure.total = total;
    const updatedsalarystructure = await salarystructure.save();
    res.json(updatedsalarystructure);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const getStructureByEmployee = asyncHandler(async (req, res) => {
  const { employee } = req.query;

  const salarystructure = await SalaryStructure.findOne({ employee });

  if (salarystructure) {
    res.json(salarystructure);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});
const getGeneratedSalary = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 30;
  const count = await Salary.countDocuments({});
  var pageCount = Math.floor(count / 30);
  if (count % 30 !== 0) {
    pageCount = pageCount + 1;
  }

  const salarystructure = await Salary.find({})
    .populate("employee salaryStructure")
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .skip(pageSize * (page - 1));

  if (salarystructure) {
    res.json({salarystructure, pageCount});
  } else {
    res.status(404);
    throw new Error("Error");
  }
});
const getSalaryByEmployeeMonthly = asyncHandler(async (req, res) => {
  const { employee, dateofmonth } = req.query;
  const s1 = parseISO(dateofmonth);
  const salarystructure = await SalaryStructure.findOne({ employee: employee });

  const absent = await Attendance.countDocuments({
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
  const deduction = (salarystructure?.total / 30) * absent;
  const amount = salarystructure?.total - deduction;
  if (salarystructure) {
    res.json({ salarystructure, absent, deduction, amount });
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const generateSalary = asyncHandler(async (req, res) => {
  const { employee, salaryStructure, dateofmonth, bonus, month } = req.body;
  const s1 = parseISO(dateofmonth);
  const salarystructure = await SalaryStructure.findById(salaryStructure);
  const absent = await Attendance.countDocuments({
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
    bonus,
  });
  if (salary) {
    res.json(salary);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

module.exports = {
  createSalaryStructure,
  generateSalary,
  getStructureByEmployee,
  updateSalaryStructure,
  getSalaryByEmployeeMonthly,
  getGeneratedSalary,
};
