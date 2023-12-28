import express from "express";
import {
  registerAgentController,
  loginAgentController,
  getAgentBookingsController,
  getAllAgentBookingsController,
} from "../controllers/agents.controller.js";

const router = express.Router();

router.post("/register", registerAgentController);
router.post("/login", loginAgentController);
router.get("/getAgentBookings/:agentId", getAgentBookingsController);
router.get("/getAllAgentBookings", getAllAgentBookingsController);

export default router;
