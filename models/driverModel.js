const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");

const driverSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    bankDetails: {
      type: Object,
    },
    fathername: {
      type: String,
    },
    dl: {
      type: String,
    },
    dob: {
      type: String,
    },
    address: {
      type: String,
    },
    pan: {
      type: String,
    },
    aadhar: {
      type: String,
    },
    photo: {
      type: String,
    },
    qualification: {
      type: String,
    },
    category: {
      type: String,
    },
    status: {
      type: String,
    },
    pushToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

driverSchema.methods.matchPassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};

driverSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
