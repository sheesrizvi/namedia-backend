const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");

const employeeSchema = mongoose.Schema(
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
    allergy: {
      type: String,
    },
    qualification: {
      type: String,
    },
    category: {
      type: String,
    },
    photo: {
      type: String,
    },
    bankDetails: {
      type: Object,
    },
    fathername: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.methods.matchPassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
