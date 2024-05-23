const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Driver",
    },
    image: {
      type: String,
    },
    location: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number], index: "2dsphere" },
      },
    approved: {
      type: Boolean,
      deafult: false,
    },
    type: {
      type: String,
      deafult: "Report",
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.index({ location: "2dsphere" });

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
