import {
  registerAgent,
  loginAgent,
  getAgentBookings,
  getAllAgentsBookings,
  getBalanceAPI,
  adminApproveAgent,
  adminRejectAgent,
  getAllPendingAgents,
  getAllBookings,
  getAllBookingRefund,
  getAgentPerformanceReport,
} from '../service/agents.service.js';

export const registerAgentController = async (req, res) => {
  try {
    const result = await registerAgent(req.body);
    res.status(result.status).json({ message: result.message, data: result.data });
  } catch (err) {
    res.status(500).json({ message: "An error occurred while registering an agent" });
  }
};

export const loginAgentController = async (req, res) => {
  try {
    const { emailMobile, password } = req.body;
    const result = await loginAgent(emailMobile, password);

    if (result.status === 200) {
      res.cookie("token", result.token, {
        maxAge: 3600000,
      });
    }

    res.status(result.status).json(result);
  } catch (err) {
    res.status(500).json({ message: "An error occurred while logging in" });
  }
};


export const getAgentBookingsController = async (req, res) => {
  try {
    const { agentId } = req.params;
    const result = await getAgentBookings(agentId);
    res.status(result.status).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting bookings" });
  }
};

export const getAllAgentBookingsController = async (req, res) => {
  try {
    const result = await getAllAgentsBookings();
    res.status(result.status).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting bookings" });
  }
};


export const getBalanceAPIController = async (req, res) => {
  try {
    const result = await getBalanceAPI();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({ message: "Error getting balance" });
  }
};

export const adminApproveAgentController = async (req, res) => {
  try {
    const { agentId } = req.params;
    const result = await adminApproveAgent(agentId);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({ message: "Error approving agent" });
  }
};


export const adminRejecteAgentController = async (req, res) => {
  try {
    const { agentId } = req.params;
    const result = await adminRejectAgent(agentId);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({ message: "Error rejecting agent" });
  }
};

export const getAllPendingAgentsControllr = async (req, res) => {
  try {
    const result = await getAllPendingAgents();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({ message: "Error getting pending agent data" });
  }
};

export const getAllBookingsController = async (req, res) => {
  try {
    const result = await getAllBookings();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({ message: "Error getting all bookings" });
  }
};

export const getAllBookingRefundsController = async (req, res) => {
  try {
    const result = await getAllBookingRefund();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({ message: "Error getting all booking refunds" });
  }
};

export const getAgentPerformanceReportController = async (req, res) => {
  try {
    const result = await getAgentPerformanceReport();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({ message: "Error getting all agents performance report" });
  }
};