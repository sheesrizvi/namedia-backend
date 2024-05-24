const mongoose = require("mongoose");

const reportGramSchema = mongoose.Schema(
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
      deafult: "ReportGram",
    },
  },
  {
    timestamps: true,
  }
);

reportGramSchema.index({ location: "2dsphere" });

const ReportGram = mongoose.model("ReportGram", reportGramSchema);

module.exports = ReportGram;
