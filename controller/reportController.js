const asyncHandler = require("express-async-handler");

const { startOfDay, endOfDay, parseISO } = require("date-fns");
const Report = require("../models/reportModel");

const createReport = asyncHandler(async (req, res) => {
  const { driver, image, location, approved, activity, video, address } =
    req.body;

  const expense = await Report.create({
    driver,
    image,
    location: {
      type: "Point",
      coordinates: [location.long, location.lat],
    },
    approved,
    video,
    activity,
    address,
  });
  if (expense) {
    res.status(201).json(expense);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const getUnApprovedReport = asyncHandler(async (req, res) => {
  const { activity } = req.query;

  const expense = await Report.find({
    $and: [{ activity: activity }, { approved: false }],
  }).populate("activity driver");
  if (expense) {
    res.json(expense);
  } else {
    res.status(404);
    throw new Error("not found");
  }
});

const approveReport = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const expense = await Report.findOneAndUpdate(
    { _id: id },
    { approved: true }
  );
  res.json("success");
});

const createMonthlyReport = asyncHandler(async (req, res) => {
  const { startDate, endDate, activity } = req.query;

  const s1 = parseISO(startDate);
  const s2 = parseISO(endDate);

  const expense = await Report.find({
    $and: [
      { approved: true },
      {
        createdAt: {
          $gte: startOfDay(s1),
          $lte: endOfDay(s2),
        },
      },
      { activity: activity },
    ],
  }).populate("activity driver");
  if (expense) {
    res.json(expense);
  } else {
    res.status(404);
    throw new Error("not found");
  }
});

module.exports = {
  createMonthlyReport,
  approveReport,
  getUnApprovedReport,
  createReport,
};
