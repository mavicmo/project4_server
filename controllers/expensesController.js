import db from "../Models/index.js";
import expensesFunctions from "../Middleware/expensesFunctions.js";

// get expenses Model
const { Expenses } = db;

// create a expense
const createExpense = async (req, res) => {
  try {
    const { amount, category } = req.body;
    let name = req.body.name.toLowerCase();
    //validate if expense already exist
    const exists = await expensesFunctions.expenseExist(name);
    if (exists) throw "expenseExists";
    if (exists === "serverError") throw exists;
    // create expense in db
    const newExpense = {
      name,
      amount,
      category,
    };

    await Expenses.create(newExpense);
    return res.status(201).json({
      status: 201,
      newExpense,
      message: "Expense was created successfully",
      requestedAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);

    // month and year already exist
    if (error === "expenseExists") {
      return res.status(409).json({
        status: 409,
        message: error,
        requestAt: new Date().toLocaleString(),
      });
    }
    // all other errors
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};
// read a expense by ID
const getExpensesById = async (req, res) => {
  try {
    // get id of the expense
    const id = req.params.id;
    //get expense data
    const expense = await expensesFunctions.findExpenseById(id);

    return res.status(200).json({
      status: 200,
      message: "Success",
      expense,
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);
    // month and year already exist
    if (error === "expenseNotFound") {
      return res.status(409).json({
        status: 409,
        message: error,
        requestAt: new Date().toLocaleString(),
      });
    }
    // all other errors
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};
// read all the expenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expenses.find({});

    return res.status(200).json({
      status: 200,
      message: "Success",
      expenses,
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);
    // all other errors
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};
// update a expense by ID
const updateExpensesById = async (req, res) => {
  try {
    //get expense ID
    const id = req.params.id;
    // update expense object
    const updateExpense = await expensesFunctions.updateExpense(id, req.body);
    if (updateExpense === false) throw "updateError";

    return res.status(200).json({
      status: 200,
      message: "Success",
      updateExpense,
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);
    // update error
    if (error === "updateError") {
      return res.status(409).json({
        status: 409,
        message: error,
        requestAt: new Date().toLocaleString(),
      });
    }
    // all other errors
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};
// delete a expense by ID
const deleteExpensesById = async (req, res) => {
  try {
    await Expenses.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: 200,
      message: "Success Expense has been deleted",
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);
    // all other errors
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};

const expensesCtrl = {
  createExpense,
  getExpensesById,
  getAllExpenses,
  updateExpensesById,
  deleteExpensesById,
};

export default expensesCtrl;
