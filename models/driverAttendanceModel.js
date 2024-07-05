const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Driver",
    },
    date: {
      type: Date,
      required: true,
    },
    absent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DriverAbsent",
    },
    holiday: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DriverHoliday",
    },
    present: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DriverPresent",
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const DriverAttendance = mongoose.model("DriverAttendance", attendanceSchema);

module.exports = DriverAttendance;
