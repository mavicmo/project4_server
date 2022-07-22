import express from "express";
import auth from "../Middleware/auth.js";
const router = express.Router();

/* exampleControllers */
import controllers from "../controllers/index.js";

// signup route
router.post("/signup", controllers.usersCtrl.signup);

// login route
router.post("/login", controllers.usersCtrl.login);

//get all users
router.get("/", controllers.usersCtrl.getAllUsers);
// get user by ID
router.get("/get/:id", controllers.usersCtrl.getUserByID);

// update user by ID
router.put("/edit/:id", auth, controllers.usersCtrl.updateUserByID);

// delete user by ID
router.delete("/:id", auth, controllers.usersCtrl.deleteUserByID);
export { router as usersRoutes };
