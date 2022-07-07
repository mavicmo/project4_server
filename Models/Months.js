// import db from "./index.js";
// import Expenses from "./Expenses.js";
import mongoose from "mongoose";

// const { Expenses } = db;

const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

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
    user: { type: ObjectId, ref: "User", required: true },
    expenses: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const MonthModel = mongoose.model("MonthModel", Months);

export default MonthModel;
