const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    date: {
      type: Date,
      required: true,
    },
    absent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    holiday: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Holiday",
    },
    present: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Present",
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
