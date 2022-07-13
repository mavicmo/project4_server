import express from "express";
import auth from "../Middleware/auth.js";
import controllers from "../controllers/index.js";

const { expensesCtrl } = controllers;
const router = express.Router();

// create a Expense route
router.post("/createexpense", expensesCtrl.createExpense);
// get a Expense by ID route
router.get("/:id", expensesCtrl.getExpensesById);
//get all the expenses
router.get("/", expensesCtrl.getAllExpenses);
// update a Expense route
router.put("/edit/:id", expensesCtrl.updateExpensesById);
// delete a Expense route
router.delete("/:id", auth, expensesCtrl.deleteExpensesById);

export { router as expensesRoutes };
