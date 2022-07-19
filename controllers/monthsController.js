import db from "../Models/index.js";
import monthsFunctions from "../Middleware/monthsFunctons.js";
import userFunctions from "../Middleware/userFunctions.js";
import expensesFunctions from "../Middleware/expensesFunctions.js";
//import months from the DB
const { Months, Users, Expenses } = db;

// create a month object
const createMonth = async (req, res) => {
  try {
    // retrive the data
    const { year } = req.body;

    //lower month to lowerCase
    const month = req.body.month.toLowerCase();
    // check if the month and year already exist
    const exists = await monthsFunctions.monthsExist(month, year);

    // get current user
    const currentUser = await userFunctions.findUserById(req.user._id);
    if (exists) throw "monthExists";
    if (exists === "serverError") throw exists;
    // create the new month object
    const newMonth = {
      month,
      year,
      user: currentUser._id,
    };

    await Months.create(newMonth);

    return res.status(201).json({
      status: 201,
      newMonth,
      message: "Month was created successfully",
      requestedAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);

    // month and year already exist
    if (error === "monthExists") {
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

// read a month object
const getMonthById = async (req, res) => {
  try {
    //get url id
    const id = req.params.id;
    // get month data
    const month = await monthsFunctions.findMonthById(id);

    return res.status(200).json({
      status: 200,
      message: "Success",
      month,
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);

    // month and year already exist
    if (error === "notFound") {
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
// read all the month objects
const getAllMonths = async (req, res) => {
  try {
    // get month data
    const month = await monthsFunctions.findMonths();

    return res.status(200).json({
      status: 200,
      message: "Success",
      month,
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);

    // month and year already exist
    if (error === "notFound") {
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
// update a month object
const updateMonthByID = async (req, res) => {
  try {
    //get params id
    const id = req.params.id;

    const updateMonth = await monthsFunctions.updateMonth(id, req.body);
    if (updateMonth === false) throw "updateError";

    return res.status(200).json({
      status: 200,
      message: "Success",
      updateMonth,
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

//delete a month object
const deleteMonthByID = async (req, res) => {
  try {
    await Months.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: 200,
      message: "Success Month has been deleted",
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

const addExpense = async (req, res) => {
  try {
    // get the req body
    const { expenseId, monthId } = req.body;

    const userId = req.user._id;
    // validate input
    if (!(expenseId && monthId)) {
      throw "inputError";
    }

    // get ID for user and month
    const currentUser = await userFunctions.findUserById(userId);
    const currentMonth = await monthsFunctions.findMonthById(monthId);

    // check if this is the user that created this month
    if (!currentUser._id.equals(currentMonth.user))
      return res
        .status(403)
        .send({ message: "This User does not have access to this Month" });

    //find the index of the expense to add
    const index = currentMonth.expenses.indexOf(expenseId);

    //add expense to the month
    if (index == -1) {
      currentMonth.expenses.push(expenseId);
    }

    await currentMonth.save();
    res.status(200).send({
      data: currentMonth,
      message: "Expense has been added to the Month",
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

const removeExpense = async (req, res) => {
  console.log(req.body);
  try {
    // get the req body
    const { expenseId, monthId } = req.body;

    const userId = req.user._id;
    // validate input
    if (!(expenseId && monthId)) {
      throw "inputError";
    }

    // get ID for user and month
    const currentUser = await userFunctions.findUserById(userId);
    const currentMonth = await monthsFunctions.findMonthById(monthId);

    // check if this is the user that created this month
    if (!currentUser._id.equals(currentMonth.user))
      return res
        .status(403)
        .send({ message: "This User does not have access to this Month" });

    //find the index of the expense to add
    const index = currentMonth.expenses.indexOf(expenseId);

    //remove expense to the month
    currentMonth.expenses.splice(index, 1);

    await currentMonth.save();
    res.status(200).send({
      data: currentMonth,
      message: "Expense has been removed to the Month",
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

const getExpensePerMonth = async (req, res) => {
  try {
    const monthId = req.params.id;

    const month = await monthsFunctions.findMonthById(monthId);

    const monthExpenses = await expensesFunctions.findMonthExpenses(
      month.expenses
    );

    const need = monthExpenses.filter((expense) => expense.category === "Need");
    const want = monthExpenses.filter((expense) => expense.category === "Want");
    const save = monthExpenses.filter((expense) => expense.category === "Save");
    const investment = monthExpenses.filter(
      (expense) => expense.category === "Investment"
    );
    const paycheck = monthExpenses.filter(
      (expense) => expense.category === "Paycheck"
    );

    const data = {
      need,
      want,
      save,
      investment,
      paycheck,
    };

    res.status(200).send({
      data: data,
      message: "Successfully retrived all the expense data in the month",
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

const deleteExpensesPerMonth = async (req, res) => {
  try {
    const monthId = req.params.id;

    await Expenses.deleteMany({
      month: monthId,
    });

    res.status(200).send({
      message: "Successfully deleted all the expense data in the month",
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

const monthsCtrl = {
  createMonth,
  getMonthById,
  getAllMonths,
  getExpensePerMonth,
  deleteExpensesPerMonth,
  updateMonthByID,
  deleteMonthByID,
  addExpense,
  removeExpense,
};

export default monthsCtrl;
