const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const Driver = require("../models/driverModel");
const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");



const auth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(403).send("Access denied. Login Required");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
});
const admin = asyncHandler(async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(403).send("Access denied. Admin Login Required");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Admin.findById(decoded.id);
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
});
const driver = asyncHandler(async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(403).send("Access denied. Login Required");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Driver.findById(decoded.id);
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
});
const employee = asyncHandler(async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(403).send("Access denied. Login Required");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Employee.findById(decoded.id);
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
});


module.exports = {
  admin,
  auth,
  driver,
  employee
};
