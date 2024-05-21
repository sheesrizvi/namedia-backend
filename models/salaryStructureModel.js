const mongoose = require("mongoose");


const salaryStructureSchema = mongoose.Schema(
  {
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Employee",
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



const SalaryStructure = mongoose.model("SalaryStructure", salaryStructureSchema);

module.exports = SalaryStructure;
