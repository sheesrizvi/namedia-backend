const jwt = require("jsonwebtoken");

const generateTokenAdmin = (id, name, email, userType) => {
  return jwt.sign({ id, name, email, userType }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
const generateTokenDriver = (id, name, email) => {
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
const generateTokenEmployee = (id, name, email) => {
  return jwt.sign(
    {
      id,
      name,
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};


module.exports = {
  generateTokenAdmin,
  generateTokenDriver,
  generateTokenEmployee
};
