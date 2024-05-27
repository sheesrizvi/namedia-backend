const express = require("express");
const {
  createExpense,
  getExpense,
  getExpenseByDriver,
  approveClearExpense,
  createActivity,
  getActivity,
  deleteActivity,
} = require("../controller/expenseController");
const router = express.Router();

router.route("/create").post(createExpense);
router.route("/get").get(getExpense);
router.route("/create-activity").post(createActivity);
router.route("/get-activity").get(getActivity);
router.route("/delete-activity").delete(deleteActivity);
router.route("/get-by-driver").get(getExpenseByDriver);
router.route("/approve-clear").post(approveClearExpense);

module.exports = router;
