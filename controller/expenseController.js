const asyncHandler = require("express-async-handler");

const { endOfDay } = require("date-fns");
const { startOfDay } = require("date-fns");
const Expense = require("../models/expenseModel");

const createExpense = asyncHandler(async (req, res) => {
  const { driver, amount, description, image } = req.body;

  const expense = await Expense.create({
    driver,
    amount,
    description,
    image,
  });
  if (expense) {
    res.status(201).json(expense);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});

const approveClearExpense = asyncHandler(async (req, res) => {
  const { id, cleared, approved } = req.body;
  if (cleared === true) {
    const expense = await Expense.findOneAndUpdate(
      { _id: id },
      { cleared: true }
    );
  }
  if (approved === true) {
    const expense = await Expense.findOneAndUpdate(
      { _id: id },
      { approved: true }
    );
  }
});

const getExpense = asyncHandler(async (req, res) => {
  const { approved } = req.query;
  if (approved) {
    const expense = Expense.find({
      approved: false,
    });
    if (expense) {
      res.json(expense);
    } else {
      res.status(404);
      throw new Error("not found");
    }
  } else {
    const expense = Expense.find({});
    if (expense) {
      res.json(expense);
    } else {
      res.status(404);
      throw new Error("not found");
    }
  }
});
const getExpenseByDriver = asyncHandler(async (req, res) => {
  const { driver } = req.query;

  const expense = await Expense.find({
    driver,
  });
  if (expense) {
    res.json(expense);
  } else {
    res.status(404);
    throw new Error("not found");
  }
});

module.exports = {
  createExpense,
  approveClearExpense,
  getExpense,
  getExpenseByDriver,
};
