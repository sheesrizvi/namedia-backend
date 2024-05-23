require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/adminRoutes")

const employeeRoutes = require("./routes/employeeRoutes")
const driverRoutes = require("./routes/driverRoutes")
const upload = require("./routes/upload")
const expenseRoutes = require("./routes/expenseRoutes")
const reportRoutes = require("./routes/reportRoutes")
const tripRoutes = require("./routes//tripRoutes")
const salaryRoutes = require("./routes/salaryRoutes")
const attendanceRoutes = require("./routes/attendanceRoutes")


const cors = require("cors");

const app = express();
const source = process.env.MONGO_URI;
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/upload", upload);
app.use("/api/driver", driverRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/attendance", attendanceRoutes);




mongoose
  .connect(source)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Successfully served on port: ${PORT}.`);
});
