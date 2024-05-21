const mongoose = require("mongoose");

const holidaySchema = mongoose.Schema(
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
    holidayType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Holiday = mongoose.model("Holiday", holidaySchema);

module.exports = Holiday;
