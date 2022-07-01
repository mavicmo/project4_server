import db from "../Models/index.js";
import monthsFunctions from "../Middleware/monthsFunctons.js";
//import months from the DB
const { Months } = db;

// create a month object
const createMonth = async (req, res) => {
  try {
    // retrive the data
    const { year } = req.body;

    //lower month to lowerCase
    const month = req.body.month.toLowerCase();
    // check if the month and year already exist
    const exists = await monthsFunctions.monthsExist(month, year);

    if (exists) throw "monthExists";
    if (exists === "serverError") throw exists;
    // create the new month object
    const newMonth = {
      month,
      year,
    };

    // send month object to MongoDB
    await Months.create(newMonth);

    return res.status(201).json({
      status: 201,
      newMonth,
      message: "Month was created successfully",
      requestedAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);

    // month and year already exist
    if (error === "monthExists") {
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

// read a month object
const getMonthById = async (req, res) => {
  try {
    //get url id
    const id = req.params.id;
    // get month data
    const month = await monthsFunctions.findMonthById(id);

    return res.status(200).json({
      status: 200,
      message: "Success",
      month,
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);

    // month and year already exist
    if (error === "monthNotFound") {
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
// update a month object
const updateMonthByID = async (req, res) => {
  try {
    //get params id
    const id = req.params.id;

    const updateMonth = await monthsFunctions.updateMonth(id, req.body);
    if (updateMonth === false) throw "updateError";

    return res.status(200).json({
      status: 200,
      message: "Success",
      updateMonth,
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);

    console.log(error);

    // month and year already exist
    if (error === "monthNotFound") {
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

//delete a month object
const deleteMonthByID = async (req, res) => {
  try {
    await Months.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: 200,
      message: "Success User has been deleted",
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);

    // month and year already exist
    if (error === "monthNotFound") {
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
const monthsCtrl = {
  createMonth,
  getMonthById,
  updateMonthByID,
  deleteMonthByID,
};

export default monthsCtrl;
