const asyncHandler = require("express-async-handler");
const { generateTokenEmployee } = require("../utils/generateToken.js");
const Employee = require("../models/employeeModel.js");
// const emailTemplate = require("../document/email");

// @desc    Auth user & get token
// @route   POST /api/users/login
//@access   Public

const authEmployee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Employee.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,

      token: generateTokenEmployee(user._id, user.name, user.email),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    User registration
// @route   POST /api/users
//@access   Public

const registerEmployee = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    bankDetails,
    fathername,
  allergy,
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

  const userExists = await Employee.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("Employee already exists");
  }

  const user = await Employee.create({
    name,
    email,
    password,
    phone,
    bankDetails,
    fathername,
    allergy,
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

      token: generateTokenEmployee(user._id, user.name, user.email),
    });
  } else {
    res.status(404);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/login
//@access   Private

const getEmployeeProfile = asyncHandler(async (req, res) => {
  const user = await Employee.findById(req.driver._id);

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
const updateEmployee = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    bankDetails,
    fathername,
    allergy,
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
    user.allergy = allergy ? allergy : user.allergy;
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
const getEmployees = asyncHandler(async (req, res) => {
  const users = await Employee.find({});
  res.json(users);
});

// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteEmployee = asyncHandler(async (req, res) => {
  const user = await Employee.findById(req.params.id);
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

const getEmployeeById = asyncHandler(async (req, res) => {
  const user = await Employee.findById(req.query.id).select("-password");
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

module.exports = {
  authEmployee,
  registerEmployee,
  getEmployeeProfile,
  getEmployees,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
};
