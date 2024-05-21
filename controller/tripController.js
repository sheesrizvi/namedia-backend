const asyncHandler = require("express-async-handler");
const Trip = require("../models/tripModel");

const createTrip = asyncHandler(async (req, res) => {
  const { driver, startTime, endTime, startlocation, endlocation, distance } =
    req.body;

  const trip = await Trip.create({
    driver,
    startTime,
    endTime,
    startlocation: {
      type: "Point",
      coordinates: [startlocation.long, startlocation.lat],
    },
    endlocation: {
      type: "Point",
      coordinates: [endlocation.long, endlocation.lat],
    },
    distance,
  });
  if (trip) {
    res.json(updatedPresent);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const getTripsbyDriver = asyncHandler(async (req, res) => {
  const trips = await Trip.find({ driver: req.query.driver });
  if (trips) {
  } else {
    res.status(404).json("error");
  }
});

module.exports = { createTrip, getTripsbyDriver };
