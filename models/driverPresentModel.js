const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");

const driverpresentSchema = mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Driver",
    },
    date: {
      type: Date,
    },
    entry: {
      type: Date,
      required: true,
    },
    exit: {
      type: Date,
    },
    workingHours: {
      type: Number,
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

driverpresentSchema.index({ location: "2dsphere" });

const DriverPresent = mongoose.model("DriverPresent", driverpresentSchema);

module.exports = DriverPresent;
