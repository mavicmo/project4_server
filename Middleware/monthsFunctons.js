import db from "../Models/index.js";

const { Months } = db;

const monthsExist = async (month, year) => {
  try {
    const exists = await Months.findOne({ month: month, year: year });

    if (exists) {
      return "monthExists";
    }
    return false;
  } catch (error) {
    return "serverError";
  }
};

const findMonthById = async (monthId) => {
  const month = await Months.findById(monthId);
  if (!month) {
    throw "notFound";
  } else {
    return month;
  }
};

const findMonths = async (userId) => {
  const month = await Months.find({ user: userId.userId });
  if (!month) {
    throw "notFound";
  } else {
    return month;
  }
};

const updateMonth = async (id, monthData) => {
  try {
    const update = await Months.findByIdAndUpdate(
      id,
      {
        $set: {
          ...monthData,
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

const expenseInMonth = async (monthId, expenseName) => {};

const monthsFunctions = {
  monthsExist,
  findMonthById,
  findMonths,
  updateMonth,
};

export default monthsFunctions;
