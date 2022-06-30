import mongoose from "mongoose";
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

const MonthModel = mongoose.model("MonthModel", Months);

export default MonthModel;
