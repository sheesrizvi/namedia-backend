const asyncHandler = require("express-async-handler");

const { startOfMonth, endOfMonth, parseISO } = require("date-fns");
const DriverSalaryStructure = require("../models/driverSalaryStructureModel");
const DriverSalary = require("../models/driverSalaryModel");
const DriverAbsent = require("../models/driverAbsentModel");
const DriverAttendance = require("../models/driverAttendanceModel");

const createSalaryStructure = asyncHandler(async (req, res) => {
  const { driver, basic, hra, tele, ta, esi, pf, total } = req.body;

  const salarystructure = await DriverSalaryStructure.create({
    driver,
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

  const salarystructure = await DriverSalaryStructure.findById(id);

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

const getStructureByDriver = asyncHandler(async (req, res) => {
  const { driver } = req.query;

  const salarystructure = await DriverSalaryStructure.findOne({ driver });

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
  const count = await DriverSalary.countDocuments({});
  var pageCount = Math.floor(count / 30);
  if (count % 30 !== 0) {
    pageCount = pageCount + 1;
  }

  const salarystructure = await DriverSalary.find({})
    .populate("driver driverSalaryStructure")
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
const getSalaryByDriverMonthly = asyncHandler(async (req, res) => {
  const { driver, dateofmonth } = req.query;
  const s1 = parseISO(dateofmonth);
  const salarystructure = await DriverSalaryStructure.findOne({ driver: driver });

  const absent = await DriverAbsent.countDocuments({
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
  const { driver, salaryStructure, dateofmonth, bonus, month, deduct } = req.body;
  const s1 = parseISO(dateofmonth);
  const salarystructure = await DriverSalaryStructure.findById(salaryStructure);
  const absent = await DriverAttendance.countDocuments({
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
  const amount = salarystructure.total - deduction - deduct;
  const salary = await DriverSalary.create({
    driver,
    driverSalaryStructure: salaryStructure,
    month,
    amount,
    bonus,
    deduct
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
  getStructureByDriver,
  updateSalaryStructure,
  getSalaryByDriverMonthly,
  getGeneratedSalary,
};
