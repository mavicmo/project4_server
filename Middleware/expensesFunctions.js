import db from "../Models/index.js";

const { Expenses, Months } = db;

// function to validate if the expenese already exists
const expenseExist = async (name, amount, monthId) => {
  try {
    const month = await Months.findById(monthId);
    const expense = await Expenses.findOne({ name: name, amount: amount });

    const doesExist = false;

    month.expenses.forEach((id) => {
      currentExpense = Expenses.findOne({ id });
      console.log(currentExpense);
    });
    // month.expenses.forEach((id) => {
    //   expense.forEach((expenseId) => {
    //     currentExpense = Expenses.findOne({ id });
    //     console.log(currentExpense);
    //     if (expenseId._id === id) {
    //       doesExist = true;
    //     }
    //   });
    // });

    if (doesExist) {
      return "expenseExists";
    } else {
      return false;
    }
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

const findMonthExpenses = async (expenseId) => {
  const expense = await Expenses.find().where("_id").in(expenseId).exec();

  // console.log(expense);
  // console.log(expenseId);
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
  findMonthExpenses,
};

export default expensesFunctions;
