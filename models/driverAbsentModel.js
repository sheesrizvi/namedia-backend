const mongoose = require("mongoose");

const DriverabsentSchema = mongoose.Schema(
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
    leaveType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DriverAbsent = mongoose.model("DriverAbsent", DriverabsentSchema);

module.exports = DriverAbsent;
