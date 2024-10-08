const asyncHandler = require("express-async-handler");

const { endOfDay } = require("date-fns");
const { startOfDay } = require("date-fns");
const Expense = require("../models/expenseModel");
const Activity = require("../models/activityModel");
const { parseISO } = require("date-fns");
const createExpense = asyncHandler(async (req, res) => {
  const { driver, amount, description, image, type } = req.body;

  const expense = await Expense.create({
    driver,
    amount,
    description,
    image,
    type,
  });
  if (expense) {
    res.status(201).json(expense);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});
const createActivity = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const expense = await Activity.create({
    name,
  });
  if (expense) {
    res.status(201).json(expense);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});
const getActivity = asyncHandler(async (req, res) => {
  const expense = await Activity.find({});
  if (expense) {
    res.status(201).json(expense);
  } else {
    res.status(404);
    throw new Error("Error");
  }
});
const deleteActivity = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const expense = await Activity.findOneAndDelete({
    id,
  });

  res.status(201).json(expense);
});

const approveClearExpense = asyncHandler(async (req, res) => {
  const { id, cleared, approved } = req.body;
  if (cleared) {
    const expense = await Expense.findOneAndUpdate(
      { _id: id },
      { cleared: cleared }
    );
    res.json("success");
  }
  if (approved) {
    const expense = await Expense.findOneAndUpdate(
      { _id: id },
      { approved: approved }
    );
    res.json("success");
  }
});

const getExpense = asyncHandler(async (req, res) => {
  const { approved } = req.query;
  if (approved) {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 30;

    const count = await Expense.countDocuments({});

    var pageCount = Math.floor(count / 30);
    if (count % 30 !== 0) {
      pageCount = pageCount + 1;
    }
    const expense = await Expense.find({
      approved: false,
    })
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1));
    if (expense) {
      res.json({ expense, pageCount });
    } else {
      res.status(404);
      throw new Error("not found");
    }
  } else {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 30;

    const count = await Expense.countDocuments({});
    var pageCount = Math.floor(count / 30);
    if (count % 30 !== 0) {
      pageCount = pageCount + 1;
    }
    const expense = await Expense.find({})
      .populate("driver", "name")
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1));
    if (expense) {
      res.json({ expense, pageCount });
    } else {
      res.status(404);
      throw new Error("not found");
    }
  }
});
const getExpenseByDriver = asyncHandler(async (req, res) => {
  const { driver } = req.query;
  if (req.query.pageNumber) {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 30;

    const count = await Expense.countDocuments({});
    var pageCount = Math.floor(count / 30);
    if (count % 30 !== 0) {
      pageCount = pageCount + 1;
    }
    const expense = await Expense.find({
      driver,
    })
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1));
    if (expense) {
      res.json({ expense, pageCount });
    } else {
      res.status(404);
      throw new Error("not found");
    }
  } else {
    const { startDate, endDate } = req.query;
    const s1 = parseISO(startDate);
    const s2 = parseISO(endDate);
    const expense = await Expense.find({
      $and: [
       { driver: driver},
        {
          createdAt: {
            $gte: startOfDay(s1),
            $lte: endOfDay(s2),
          },
        },
      ],
    }).sort({ createdAt: -1 });
    if (expense) {
      res.json( expense);
    } else {
      res.status(404);
      throw new Error("not found");
    }
  }
});

module.exports = {
  createExpense,
  approveClearExpense,
  getExpense,
  getExpenseByDriver,
  createActivity,
  getActivity,
  deleteActivity,
};
