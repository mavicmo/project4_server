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
  },
  {
    timestamps: true,
  }
);

const ExpensesModel = mongoose.model("ExpensesModel", Expenses);

export default ExpensesModel;
