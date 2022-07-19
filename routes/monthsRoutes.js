import express from "express";
import auth from "../Middleware/auth.js";
const router = express.Router();

import controllers from "../controllers/index.js";

const { monthsCtrl } = controllers;

// create a month route
router.post("/createmonth", auth, monthsCtrl.createMonth);

// get a month by ID route
router.get("/:id", auth, monthsCtrl.getMonthById);
// get all the months
router.get("/", auth, monthsCtrl.getAllMonths);
router.get("/month/getexpenses/:id", monthsCtrl.getExpensePerMonth);
// update a month route
router.put("/edit/:id", auth, monthsCtrl.updateMonthByID);
// delete a month route
router.delete("/:id", auth, monthsCtrl.deleteMonthByID);
// delete all the expenses for each month
router.delete(
  "/month/deleteexpenses/:id",
  auth,
  monthsCtrl.deleteExpensesPerMonth
);
// add expense to month route
router.put("/addexpense", auth, monthsCtrl.addExpense);
// remove expense from route
router.put("/removeexpense", auth, monthsCtrl.removeExpense);

export { router as monthsRoutes };
