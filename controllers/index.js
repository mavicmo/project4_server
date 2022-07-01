import exampleCtrl from "./exampleController.js";
import usersCtrl from "./UsersController.js";
import monthsCtrl from "./monthsController.js";

const controllers = {
  exampleCtrl,
  usersCtrl,
  monthsCtrl,
};

export default controllers;

/* NOTE TO SELF
 * Do add a index but rather spilt the controllers to their
 * own folders and import in the route file that needs it
 */
