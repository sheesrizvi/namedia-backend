const express = require("express");
const { createExpense, getExpense, getExpenseByDriver, approveClearExpense } = require("../controller/expenseController");
const router = express.Router();

router.route("/create").post(createExpense);
router.route("/get").get(getExpense);
router.route("/get-by-driver").post(getExpenseByDriver);
router.route("/approve-clear").get(approveClearExpense);


module.exports = router;