const mongoose = require("mongoose");

const absentSchema = mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    Date: {
      type: Date,
      required: true,
    },
    leaveType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Absent = mongoose.model("Absent", absentSchema);

module.exports = Absent;
