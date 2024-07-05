const mongoose = require("mongoose");

const holidaySchema = mongoose.Schema(
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
    holidayType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DriverHoliday = mongoose.model("DriverHoliday", holidaySchema);

module.exports = DriverHoliday;
