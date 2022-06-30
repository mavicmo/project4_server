import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Expenses = new Schema(
  {
    name: {
      type: String,
      required: [true],
    },
    amount: {
      type: String,
      required: [true],
    },
    category: {
      type: Array,
      default: [],
    },
    date: {
      type: Date,
      required: [true],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const ExpensesModel = mongoose.model("ExpensesModel", Expenses);

export default ExpensesModel;
