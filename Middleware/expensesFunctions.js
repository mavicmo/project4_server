import db from "../Models/index.js";

const { Expenses } = db;

// function to validate if the expenese already exists
const expenseExist = async (name) => {
  try {
    const exists = await Expenses.findOne({ name: name });

    if (exists) {
      return "expenseExists";
    }
    return false;
  } catch (error) {
    return "serverError";
  }
};
const findExpenseById = async (expenseId) => {
  const expense = await Expenses.findById(expenseId);
  if (!expense) {
    throw "expenseNotFound";
  } else {
    return expense;
  }
};

const updateExpense = async (id, expenseData) => {
  try {
    const update = await Expenses.findByIdAndUpdate(
      id,
      {
        $set: {
          ...expenseData,
        },
      },
      {
        new: true,
      }
    );
    return update;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const expensesFunctions = {
  expenseExist,
  findExpenseById,
  updateExpense,
};

export default expensesFunctions;
