const asyncHandler = require("express-async-handler");

const { endOfDay } = require("date-fns");
const { startOfDay } = require("date-fns");
const { parseISO } = require("date-fns");
const DriverAbsent = require("../models/driverAbsentModel");
const DriverAttendance = require("../models/driverAttendanceModel");
const DriverHoliday = require("../models/driverHolidayModel");
const DriverPresent = require("../models/driverPresentModel");

const createabsent = asyncHandler(async (req, res) => {
  const { driver, date, absent, holiday, leaveType, holidayType } = req.body;

  const createAten = async (element) => {
    const absents = await DriverAbsent.create({ driver, date: element, leaveType });
    const attendance = await DriverAttendance.create({
      driver,
      date: element,
      absent: absents._id,
      type: leaveType,
    });
  };
  if (absent) {
    date.forEach((element) => {
      createAten(element);
    });
    res.json("success");
  } else if (holiday) {
    const holidays = await DriverHoliday.create({ driver, date, holidayType });
    const attendance = await DriverAttendance.create({
      driver,
      date,
      holiday: holidays._id,
      type: "holiday",
    });
    if (attendance) {
      res.status(201).json(attendance);
    } else {
      res.status(404);
      throw new Error("Error");
    }
  }
});

const createpresentlogin = asyncHandler(async (req, res) => {
  const { driver, date, entry, location } = req.body;
  const presents = await DriverPresent.create({
    driver,
    date,
    entry,
    location: {
      type: "Point",
      coordinates: [location.long, location.lat],
    },
  });
  const attendance = await DriverAttendance.create({
    driver,
    date: entry,
    present: presents._id,
    type: "present",
  });

  if (attendance) {
    res.status(201).json(attendance);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const createpresentlogout = asyncHandler(async (req, res) => {
  const { id, exit } = req.body;

  const present = await DriverPresent.findById(id);
  const workingHours =
    (new Date(exit).getTime() - present.entry.getTime()) /
    (1000 * 60 * 60).toFixed(2);
  if (present) {
    present.exit = exit;
    present.workingHours = workingHours;
    const updatedPresent = await present.save();

    res.json(updatedPresent);
  } else {
    res.status(404);
    throw new Error("Attendance not found");
  }
});

const getattendanceByDriver = asyncHandler(async (req, res) => {
  const { startDate, endDate, driver } = req.query;

  const s1 = parseISO(startDate);
  const s2 = parseISO(endDate);
  const attendance = await DriverAttendance.find({
    $and: [
      {driver: driver},
      {
        date: {
          $gte: startOfDay(s1),
          $lte: endOfDay(s2),
        },
      },
    ],
  });

  if (attendance) {
    res.json(attendance);
  } else {
    res.status(404);
    throw new Error("Attendance not found");
  }
});
const getAllattendanceByDriver = asyncHandler(async (req, res) => {
  const { driver } = req.query;

  const attendance = await DriverAttendance.find({ employee });

  if (attendance) {
    res.json(attendance);
  } else {
    res.status(404);
    throw new Error("Attendance not found");
  }
});

module.exports = {
  createabsent,
  createpresentlogin,
  createpresentlogout,
  getattendanceByDriver,
  getAllattendanceByDriver,
};
