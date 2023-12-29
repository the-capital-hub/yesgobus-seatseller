import Agent from "../modals/agents.modal.js";
import User from "../modals/user.modal.js";
import BusBooking from "../modals/busBooking.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendSrsRequest, sendVrlRequest } from "./buBooking.service.js";
import { generateId } from "../utils/generateRandomNumber.js";

export const registerAgent = async (agentData) => {
  try {
    const existingUserAccount = await User.findOne({
      userId: agentData.userId,
    })
    if (!existingUserAccount) {
      return {
        status: 404,
        message: "Yesgobus account doesnot exists",
      };
    }
    const existingAgent = await Agent.findOne({
      $or: [{ email: agentData.email }, { phNum: agentData.phNum }, { userId: agentData.userId }],
    });
    if (!existingAgent) {
      const agentCode = generateId(6);
      const hashedPassword = bcrypt.hashSync(agentData.password, 5);
      const newAgent = new Agent({
        ...agentData,
        password: hashedPassword,
        id: existingUserAccount._id,
        agentCode: agentCode,
      });
      await newAgent.save();
      return {
        status: 200,
        message: "Registration Successful",
        data: newAgent,
      };
    } else {
      return {
        status: 401,
        message: "Agent already exists",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err,
    };
  }
};

export const loginAgent = async (emailMobile, password) => {
  try {
    const existingAgent = await Agent.findOne({
      $or: [{ email: emailMobile }, { phNum: emailMobile }],
      status: true,
    });

    // Check if the user is a master admin
    const isMasterAdmin = existingAgent.email === process.env.MASTER_ADMIN_EMAIL;

    if (!existingAgent && !isMasterAdmin) {
      return {
        status: 401,
        message: "Invalid credentials",
      };
    }

    const isPasswordValid = bcrypt.compareSync(password, existingAgent.password);
    if (!isPasswordValid) {
      return {
        status: 401,
        message: "Invalid password",
      };
    }
    existingAgent.password = "";
    if (existingAgent && !isMasterAdmin) {
      // For agent login
      const token = jwt.sign({ userId: existingAgent._id }, process.env.JWT_KEY);

      return {
        status: 200,
        message: "Successfully logged in",
        token: token,
        isMasterAdmin,
        data: existingAgent,
      };
    } else if (isMasterAdmin) {
      // For master admin login
      const token = jwt.sign({ role: 'masterAdmin' }, process.env.JWT_KEY);

      return {
        status: 200,
        message: "Successfully logged in as master admin",
        token: token,
        isMasterAdmin,
        data: existingAgent,
      };
    }

  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err,
    };
  }
};


export const getAgentBookings = async (agentId) => {
  try {
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return {
        status: 404,
        message: "Agent not found",
      }
    }
    const bookings = await BusBooking.find({
      $or: [
        { userId: agent.id },
        { agentCode: agent.agentCode },
      ],
      bookingStatus: "paid",
    });
    return {
      status: 200,
      message: "Booking records retrived",
      data: bookings,
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message || "Internal Server Error",
    };
  }
}


export const getAllAgentsBookings = async () => {
  try {
    const agents = await Agent.find({ email: { $ne: 'admin@yesgobus.com' } });
    const allBookings = await Promise.all(agents.map(async (agent) => {
      const bookings = await BusBooking.find({ userId: agent.id, bookingStatus: "paid" });
      return {
        agentName: agent.firstName + " " + agent.lastName,
        bookings: bookings,
        agentId: agent._id,
        userId: agent.userId,
      };
    }));

    return {
      status: 200,
      message: "Booking records retrieved",
      data: allBookings,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message || "Internal Server Error",
    };
  }
};

export const getBalanceAPI = async () => {
  const url = `gds/api/get_balance.json`;
  const ticketSimplyResponse = await sendSrsRequest(url, "GET");
  const vrl_url = `GetCurrentAccountBalance`;
  const vrlResponse = await sendVrlRequest(vrl_url, {});
  return {
    ticketSimply: ticketSimplyResponse.data.result.balance_amount,
    vrl: vrlResponse.data.ITSCurrentAccountBAL[0].Balance,
  };
}

export const adminApproveAgent = async (agentId) => {
  try {
    const agent = await Agent.findByIdAndUpdate(agentId,
      { status: true, },
      { new: true })
    if (!agent) {
      return {
        status: 404,
        message: "Agent not found",
      }
    }
    return {
      status: 200,
      message: "Agent account activated",
      data: agent
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message || "Internal Server Error",
    };
  }
}


export const adminRejectAgent = async (agentId) => {
  try {
    const agent = await Agent.findByIdAndDelete(agentId);
    if (!agent) {
      return {
        status: 404,
        message: "Agent not found",
      }
    }
    return {
      status: 200,
      message: "Agent rejected",
      data: agent
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message || "Internal Server Error",
    };
  }
}

export const getAllPendingAgents = async () => {
  try {
    const agents = await Agent.find({ status: false });
    return {
      status: 200,
      message: "Agent details retrived",
      data: agents
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message || "Internal Server Error",
    };
  }
}

export const getAllBookings = async () => {
  try {
    const bookings = await BusBooking.find({ bookingStatus: "paid" }).sort({ createdAt: -1 });
    return {
      status: 200,
      message: "Bookings details retrived",
      data: bookings
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message || "Internal Server Error",
    };
  }
}

export const getAllBookingRefund = async () => {
  try {
    const bookings = await BusBooking.find({ bookingStatus: "cancelled" })
      .sort({ createdAt: -1 });

    return {
      status: 200,
      message: "Bookings details retrived",
      data: bookings
    }
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message || "Internal Server Error",
    };
  }
}

export const getAgentPerformanceReport = async () => {
  try {
    const agents = await Agent.find({ email: { $ne: 'admin@yesgobus.com' }, status: true });
    const allBookings = await Promise.all(agents.map(async (agent) => {
      const bookings = await BusBooking.find({ userId: agent.id, bookingStatus: "paid" });
      const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
      return {
        agentName: agent.firstName + " " + agent.lastName,
        bookingsMade: bookings.length,
        revenue: totalRevenue,
        agentId: agent._id,
        userId: agent.userId,
      };
    }));

    return {
      status: 200,
      message: "Booking records retrieved",
      data: allBookings,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message || "Internal Server Error",
    };
  }
}