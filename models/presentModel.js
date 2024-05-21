const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");

const presentSchema = mongoose.Schema(
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
    entry: {
      type: Date,
      required: true,
    },
    exit: {
      type: Date,
    },
    workingHours: {
      type: Number
    },
    location: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number], index: "2dsphere" },
      },
  },
  {
    timestamps: true,
  }
);

presentSchema.index({ location: "2dsphere" });

const Present = mongoose.model("Present", presentSchema);

module.exports = Present;
