const asyncHandler = require("express-async-handler");

const { endOfDay } = require("date-fns");
const { startOfDay } = require("date-fns");
const Report = require("../models/reportModel");
const ReportGram = require("../models/reportGramModel");

const createReport = asyncHandler(async (req, res) => {
  const { driver, image, location, approved } = req.body;

  const expense = await Report.create({
    driver,
    image,
    location,
    approved,
  });
  if (expense) {
    res.status(201).json(expense);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const createReportGram = asyncHandler(async (req, res) => {
  const { driver, image, location, approved } = req.body;

  const expense = await ReportGram.create({
    driver,
    image,
    location,
    approved,
  });
  if (expense) {
    res.status(201).json(expense);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});
const updateReport = asyncHandler(async (req, res) => {
  const { driver, image, location, approved, id } = req.body;
  const expense = await Report.findById({
    id,
  });
  if (expense) {
    expense.image = image;
    expense.location = location;
    const updatedexpense = await expense.save();
    res.status(201).json(updatedexpense);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});
const updateReportGram = asyncHandler(async (req, res) => {
  const { driver, image, location, approved, id } = req.body;
  const expense = await ReportGram.findById({
    id,
  });
  if (expense) {
    expense.image = image;
    expense.location = location;
    const updatedexpense = await expense.save();
    res.status(201).json(updatedexpense);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const getUnApprovedReport = asyncHandler(async (req, res) => {
  const { type } = req.query;
  if (type == "Report") {
    const expense = Report.find({
      approved: false,
    });
    if (expense) {
      res.json(expense);
    } else {
      res.status(404);
      throw new Error("not found");
    }
  }
  if (type == "ReportGram") {
    const expense = ReportGram.find({});
    if (expense) {
      res.json(expense);
    } else {
      res.status(404);
      throw new Error("not found");
    }
  }
});

const approveReport = asyncHandler(async (req, res) => {
  const { type, id } = req.query;
  if (type == "Report") {
    const expense = Report.findOneAndUpdate({ _id: id }, { cleared: true });
  }
  if (type == "ReportGram") {
    const expense = ReportGram.findOneAndUpdate({ _id: id }, { cleared: true });
  }
});
const createMonthlyReport = asyncHandler(async (req, res) => {
  const { startDate, endDate, type } = req.query;
  if (type == "Report") {
    const s1 = parseISO(startDate);
    const s2 = parseISO(endDate);
    const expense = Report.find({
      $and: [
         { approved: true},
          {
            createdAt: {
              $gte: startOfDay(s1),
              $lte: endOfDay(s2),
            },
          },
        ],
    });
    if (expense) {
      res.json(expense);
    } else {
      res.status(404);
      throw new Error("not found");
    }
  } else if (type == "ReportGram") {
    const s1 = parseISO(startDate);
    const s2 = parseISO(endDate);
    const expense = ReportGram.find({
      $and: [
         { approved: true},
          {
            createdAt: {
              $gte: startOfDay(s1),
              $lte: endOfDay(s2),
            },
          },
        ],
    });
    if (expense) {
      res.json(expense);
    } else {
      res.status(404);
      throw new Error("not found");
    }
  }
  
});

module.exports = {
  createMonthlyReport,
  approveReport,
  getUnApprovedReport,
  createReport,
  createReportGram,
  updateReport,
  updateReportGram

};
