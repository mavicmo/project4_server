import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

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
    user: { type: ObjectId, ref: "User", required: true },
    month: { type: ObjectId, ref: "Months", required: true },
    category: {
      type: String,
      required: [true],
    },
  },
  {
    timestamps: true,
  }
);

const ExpensesModel = mongoose.model("ExpensesModel", Expenses);

export default ExpensesModel;
