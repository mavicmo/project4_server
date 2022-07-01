import db from "../Models/index.js";
import jwtFunctions from "../auth/jwt.js";
import encrypt from "../auth/encrypt.js";
import userFunctions from "../Middleware/userFunctions.js";

// import the Users from the DB
const { Users } = db;
// jwt
const { createToken } = jwtFunctions;
// use hash password functionality
const { hashPassword } = encrypt;

// create user object
const signup = async (req, res) => {
  try {
    const { firstName, lastName, password, confirmPassword } = req.body;

    // make email lowercase
    const email = req.body.email.toLowerCase();

    //check if user object exist
    const exists = await userFunctions.emailExist(email);

    // throw error if email exists
    if (exists) throw exists;
    if (exists === "serverError") throw exists;

    // check password and confirmed passwords matchup
    if (password !== confirmPassword) throw "passwordDoesNotMatch";

    // hash the passwords
    const hashedPassword = hashPassword(password);

    // create the user for MongoDB
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    // send user to MongoDB
    await Users.create(newUser);

    return res.status(201).json({
      status: 201,
      message: "User was created successfully",
      requestedAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error); //keep just incase if db error

    //user already exists error
    if (error === "emailExists") {
      return res.status(409).json({
        status: 409,
        message: error,
        requestAt: new Date().toLocaleString(),
      });
    }

    // password does not match error
    if (error === "passwordMismatch") {
      return res.status(401).json({
        status: 401,
        message: error,
        requestAt: new Date().toLocaleString(),
      });
    }

    // all other errors
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};

// login with user object
const login = async (req, res) => {
  try {
    // input data
    const { password } = req.body;
    const email = req.body.email.toLowerCase();

    //validate data
    if (!(email && password)) throw "invalidInput";
    const user = await userFunctions.validatedUser(email, password);

    if (user) {
      // link jwt with user object
      const jwt = createToken(user);

      return res.status(200).json({
        status: 200,
        message: "Success",
        user,
        jwt,
        requestAt: new Date().toLocaleString(),
      });
    } else {
      throw "invalidInput";
    }
  } catch (error) {
    console.log(error); //keep just incase if db error

    //input error
    if (error === "invalidInput") {
      return res.status(409).json({
        status: 409,
        message: error,
        requestAt: new Date().toLocaleString(),
      });
    }

    // all other errors
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};

// read user object
const getUserByID = async (req, res) => {
  try {
    const id = req.user._id;
    //get user without password information from
    const user = await userFunctions.findUserById(id);
    return res.status(200).json({
      status: 200,
      message: "Success",
      user,
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);

    // error matches
    if (error === "UserNotFound") {
      return res.status(401).json({
        status: 401,
        message: error,
        requestAt: new Date().toLocaleString(),
      });
    }

    // all other errors
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};

// update  user object
const updateUserByID = async (req, res) => {
  try {
    let email;
    // get email and make it lowercase
    if (req.body.email) {
      email = req.body.email.toLowerCase();
    }
    // get ID
    const id = req.params.id;
    //get user object
    const user = await userFunctions.findUserById(id);

    if (email !== user.email) {
      const exists = await userFunctions.emailExist(email);
      if (exists) throw "emailExists";
    }

    const updateUser = await userFunctions.updateUser(id, req.body);
    if (updateUser === false) throw "updateError";

    //create a new jwt for the user
    const jwt = createToken(updateUser);

    return res.status(200).json({
      status: 200,
      message: "Success",
      updateUser,
      jwt,
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);

    // error trying to update
    if (error === "updateError") {
      return res.status(400).json({
        status: 400,
        message: "Failed to update user",
        requestAt: new Date().toLocaleString(),
      });
    }

    // send message if email already exists
    if (error === "userExists") {
      return res.status(400).json({
        status: 400,
        message: "Email already exists",
        requestAt: new Date().toLocaleString(),
      });
    }

    // all other errors
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};

//delete user object
const deleteUserByID = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: 200,
      message: "Success User has been deleted",
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);
    // all other errors
    return res.status(500).json({
      status: 500,
      message: "Server error",
      requestAt: new Date().toLocaleString(),
    });
  }
};
const usersCtrl = {
  signup,
  login,
  getUserByID,
  updateUserByID,
  deleteUserByID,
};

export default usersCtrl;
