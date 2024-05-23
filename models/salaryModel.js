const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");

const salarySchema = mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    salaryStructure: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "SalaryStructure",
    },
    bonus: {
      type: Number,
      required: true,
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

const Salary = mongoose.model("Salary", salarySchema);

module.exports = Salary;
