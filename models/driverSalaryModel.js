const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");

const salarySchema = mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Driver",
    },
    driverSalaryStructure: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "DriverSalaryStructure",
    },
    bonus: {
      type: Number,
      required: true,
    },
    deduct: {
        type: Number,
        required: true,
        default: 0
      },
    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DriverSalary = mongoose.model("DriverSalary", salarySchema);

module.exports = DriverSalary;
