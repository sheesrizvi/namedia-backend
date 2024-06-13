const asyncHandler = require("express-async-handler");
const { generateTokenDriver } = require("../utils/generateToken.js");
const nodemailer = require("nodemailer");
const Driver = require("../models/driverModel.js");
const Location = require("../models/locationModel.js");
// const emailTemplate = require("../document/email");

// @desc    Auth user & get token
// @route   POST /api/users/login
//@access   Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Driver.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,

      token: generateTokenDriver(user._id, user.name, user.email, user.type),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const createLocation = asyncHandler(async (req, res) => {
  const { location, driver } = req.body;

  const locationExists = await Location.findOne({ driver: driver });

  if (locationExists) {
    locationExists.location = {
      type: "Point",
      coordinates: [location.longitude, location.latitude],
    };
    const updatedLocation = await locationExists.save();
    res.json({ updatedLocation });
  } else {
    const driverlocation = await Location.create({
      driver: driver,
      location: {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
      },
    });
    res.json({ driverlocation });
  }
});

// @desc    User registration
// @route   POST /api/users
//@access   Public

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    bankDetails,
    fathername,
    dl,
    dob,
    address,
    pan,
    aadhar,
    photo,
    license,
    qualification,
    category,
    status,
  } = req.body;

  const userExists = await Driver.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("Driver already exists");
  }

  const user = await Driver.create({
    name,
    email,
    password,
    phone,
    bankDetails,
    fathername,
    dl,
    dob,
    address,
    pan,
    aadhar,
    photo,
    license,
    qualification,
    category,
    status,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,

      token: generateTokenDriver(user._id, user.name, user.email, user.type),
    });
  } else {
    res.status(404);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/login
//@access   Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await Driver.findById(req.query.driverId);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    bankDetails,
    fathername,
    dl,
    dob,
    address,
    pan,
    aadhar,
    photo,
    license,
    qualification,
    category,
    status,
  } = req.body;
  const user = await Driver.findById(req.body.id);

  if (user) {
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    if (password) {
      user.password = password;
    }
    user.phone = phone ? phone : user.phone;
    user.bankDetails = bankDetails ? bankDetails : user.bankDetails;
    user.fathername = fathername ? fathername : user.fathername;
    user.dl = dl ? dl : user.dl;
    user.dob = dob ? dob : user.dob;
    user.address = address ? address : user.address;
    user.license = license ? license : user.license;
    user.pan = pan ? pan : user.pan;
    user.aadhar = aadhar ? aadhar : user.aadhar;
    user.photo = photo ? photo : user.photo;
    user.qualification = qualification ? qualification : user.qualification;
    user.category = category ? category : user.category;

    const updatedDriver = await user.save();
    // console.log(updatedUser);
    res.status(201).json(updatedDriver);
  } else {
    res.status(404);
    throw new Error("Driver not found");
  }
});

// @desc    Get all users
// @route   Get /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 30;
  const count = await Driver.countDocuments({});
  var pageCount = Math.floor(count / 30);
  if (count % 30 !== 0) {
    pageCount = pageCount + 1;
  }
  const users = await Driver.find({})
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .skip(pageSize * (page - 1));
  res.json({ users, pageCount });
});

// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await Driver.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by Id
// @route   GET /api/users/:id
// @access  Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await Driver.findById(req.query.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin

const getDriverLocation = asyncHandler(async (req, res) => {

  const driver = await Location.findOne({
    driver: req.query.id,
  });

  res.json(driver);
});

module.exports = {
  authUser,
  createLocation,
  getDriverLocation,
  registerUser,
  getUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
