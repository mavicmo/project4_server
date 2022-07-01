import express from "express";
import auth from "../Middleware/auth.js";
const router = express.Router();

import controllers from "../controllers/index.js";

const { monthsCtrl } = controllers;

// create a month route
router.post("/createmonth", auth, monthsCtrl.createMonth);
// get a month by ID route
router.get("/:id", auth, monthsCtrl.getMonthById);
// update a month route
router.put("/:id", auth, monthsCtrl.updateMonthByID);
// delete a month route
router.delete("/:id", auth, monthsCtrl.deleteMonthByID);

export { router as monthsRoutes };
