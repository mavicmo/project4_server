import db from "./index.js";
import Expenses from "./Expenses.js";
import mongoose from "mongoose";

// const { Expenses } = db;

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
      type: [{ type: Schema.Types.ObjectId, ref: "ExpensesModel" }],
    },
  },
  {
    timestamps: true,
  }
);

const MonthModel = mongoose.model("MonthModel", Months);

export default MonthModel;
