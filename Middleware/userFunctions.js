import bcrypt from "bcrypt";
import db from "../Models/index.js";

const { Users } = db;

// check if the email already exists in the database
const emailExist = async (email) => {
  try {
    const userExist = await Users.findOne({ email: email });

    if (userExist) {
      return "emailExists";
    }
    return false;
  } catch (error) {
    return "serverError";
  }
};

const validatedUser = async (email, password) => {
  try {
    const user = await Users.findOne({ email: email });
    if (!user) throw "invalidInput";

    //validated password with given User
    const validatePassword = await bcrypt.compare(password, user.password);

    // once returned validate if its true or not
    if (validatePassword) {
      return user;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

// function to read a user data by ID
const findUserById = async (id) => {
  const user = await Users.findById(id).select("-password").lean();
  if (!user) {
    throw "notFound";
  } else {
    return user;
  }
};

// function to update the user
const updateUser = async (id, userData) => {
  try {
    const update = await Users.findByIdAndUpdate(
      id,
      {
        $set: {
          ...userData,
        },
      },
      {
        new: true,
      }
    );
    return update;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const userFunctions = {
  emailExist,
  validatedUser,
  findUserById,
  updateUser,
};

export default userFunctions;
