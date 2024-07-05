const mongoose = require("mongoose");


const salaryStructureSchema = mongoose.Schema(
  {
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Driver",
      },
      basic: {
        type: Number,
        required: true,
      },
      hra: {
        type: Number,
      },
      tele: {
        type: Number,
      },
      ta: {
        type: Number,
      },
      esi: {
        type: Number,
      },
      pf: {
        type: Number,
      },
      total: {
        type: Number,
      },
      
  },
  {
    timestamps: true,
  }
);



const DriverSalaryStructure = mongoose.model("DriverSalaryStructure", salaryStructureSchema);

module.exports = DriverSalaryStructure;
