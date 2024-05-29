const mongoose = require("mongoose");

const locationSchema = mongoose.Schema(
  {
    
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], index: "2dsphere" },
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Driver",
    },
  },
  {
    timestamps: true,
  }
);
locationSchema.index({ location: "2dsphere" });

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
