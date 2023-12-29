import express from "express";
import {
  registerAgentController,
  loginAgentController,
  getAgentBookingsController,
  getAllAgentBookingsController,
  getBalanceAPIController,
  adminApproveAgentController,
  getAllPendingAgentsControllr,
  getAllBookingsController,
  getAllBookingRefundsController,
  getAgentPerformanceReportController,
} from "../controllers/agents.controller.js";

const router = express.Router();

router.post("/register", registerAgentController);
router.post("/login", loginAgentController);
router.get("/getAgentBookings/:agentId", getAgentBookingsController);
router.get("/getAllAgentBookings", getAllAgentBookingsController);
router.get("/getBalance", getBalanceAPIController);
router.patch("/approveAgent/:agentId", adminApproveAgentController);
router.get("/getAllPendingAgents", getAllPendingAgentsControllr);
router.get("/getAllBookings", getAllBookingsController);
router.get("/getAllBookingRefunds", getAllBookingRefundsController);
router.get("/getAgentPerformanceReport", getAgentPerformanceReportController);

export default router;
