const asyncHandler = require("express-async-handler");
const Attendance = require("../models/attendanceModel");
const Absent = require("../models/absentModel");
const Holiday = require("../models/holidayModel");
const Present = require("../models/presentModel");
const { endOfDay } = require("date-fns");
const { startOfDay } = require("date-fns");

const createabsent = asyncHandler(async (req, res) => {
  const { employee, date, absent, holiday, leaveType, holidayType } = req.body;
  if (absent) {
    const absents = await Absent.create({ employee, date, leaveType });
    const attendance = await Attendance.create({
      employee,
      date,
      absent: absents._id,
      type: "absent"
    });
    if (attendance) {
      res.status(201).json(attendance);
    } else {
      res.status(404);
      throw new Error("Error");
    }
  } else if (holiday) {
    const holidays = await Holiday.create({ employee, date, holidayType });
    const attendance = await Attendance.create({
      employee,
      date,
      holiday: holidays._id,
      type: "holiday"
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
  const { employee, date, entry, location } = req.body;
  const presents = await Present.create({
    employee,
    date,
    entry,
    location: {
      type: "Point",
      coordinates: [location.long, location.lat],
    },
  });
  const attendance = await Attendance.create({
    employee,
    date,
    present: presents._id,
    type: "present"
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

  const present = await Present.findById(id);
  const workingHours =
    (present.entry.getTime() - exit.getTime()) / (1000 * 60 * 60).toFixed(2);
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
const getattendanceByEmployee = asyncHandler(async (req, res) => {
  const { startDate, endDate, employee } = req.query;
  const s1 = parseISO(startDate);
  const s2 = parseISO(endDate);
  const attendance = Attendance.find({
    $and: [
      employee,
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

module.exports = {
  createabsent,
  createpresentlogin,
  createpresentlogout,
  getattendanceByEmployee,
};
