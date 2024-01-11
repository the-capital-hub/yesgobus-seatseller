import express from "express";
import {
  registerAgentController,
  loginAgentController,
  getAgentBookingsController,
  getAllAgentBookingsController,
  getBalanceAPIController,
  adminApproveAgentController,
  adminRejecteAgentController,
  getAllPendingAgentsControllr,
  getAllBookingsController,
  getAllBookingRefundsController,
  getAgentPerformanceReportController,
  verifyAgentCodeController,
  isAgentController,
  getAgentStatsController,
} from "../controllers/agents.controller.js";

const router = express.Router();

router.post("/register", registerAgentController);
router.post("/login", loginAgentController);
router.get("/getAgentBookings/:agentId", getAgentBookingsController);
router.get("/getAllAgentBookings", getAllAgentBookingsController);
router.get("/getBalance", getBalanceAPIController);
router.patch("/approveAgent/:agentId", adminApproveAgentController);
router.delete("/rejectAgent/:agentId", adminRejecteAgentController);
router.get("/getAllPendingAgents", getAllPendingAgentsControllr);
router.get("/getAllBookings", getAllBookingsController);
router.get("/getAllBookingRefunds", getAllBookingRefundsController);
router.get("/getAgentPerformanceReport", getAgentPerformanceReportController);
router.get("/verifyAgentCode/:agentCode", verifyAgentCodeController);
router.get("/isAgent/:userId", isAgentController);
router.get("/agentStats/:agentId", getAgentStatsController);

export default router;
