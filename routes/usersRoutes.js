import express from "express";
import auth from "../Middleware/auth.js";
const router = express.Router();

/* exampleControllers */
import controllers from "../controllers/index.js";

// signup route
router.post("/signup", controllers.usersCtrl.signup);

// login route
router.post("/login", controllers.usersCtrl.login);

// get user by ID
router.get("/:id", auth, controllers.usersCtrl.getUserByID);

// update user by ID
router.put("/:id", auth, controllers.usersCtrl.updateUserByID);

// delete user by ID
router.delete("/:id", auth, controllers.usersCtrl.deleteUserByID);
export { router as usersRoutes };
