import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    Months: {
      type: Schema.Types.ObjectId,
      ref: "Months",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("UserModel", Users);

export default UserModel;
