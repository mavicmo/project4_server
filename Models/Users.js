import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,

      unique: true,
    },
    password: {
      type: String,
    },
    Months: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("UserModel", Users);

export default UserModel;
