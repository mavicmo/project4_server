/* Connection to DB */
import "../config/db.connection.js";

/* Import different Models */
import ExampleModel from "./ExampleModel.js";
import Users from "./Users.js";
import Months from "./Months.js";
import Expenses from "./Expenses.js";

const db = {
  ExampleModel,
  Users,
  Months,
  Expenses,
};

export default db;
