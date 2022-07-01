import mongoose from "mongoose";
import ExpensesModel from "./Expenses.js";
const Schema = mongoose.Schema;

const Months = new Schema(
  {
    month: {
      type: String,
      required: [true],
    },
    year: {
      type: String,
      required: [true],
    },
    expenses: {
      type: Schema.Types.ObjectId,
      ref: "ExpensesModel",
    },
  },
  {
    timestamps: true,
  }
);

const MonthModel = mongoose.model("MonthModel", Months);

export default MonthModel;
