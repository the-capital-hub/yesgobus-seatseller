import Agent from "../modals/agents.modal.js";
import User from "../modals/user.modal.js";
import BusBooking from "../modals/busBooking.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      const hashedPassword = bcrypt.hashSync(agentData.password, 5);
      const newAgent = new Agent({
        ...agentData,
        password: hashedPassword,
        id: existingUserAccount._id,
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
    });
    if (!existingAgent) {
      return {
        status: 401,
        message: "Agent not found",
      };
    }
    const isPasswordValid = bcrypt.compareSync(password, existingAgent.password);
    if (!isPasswordValid) {
      return {
        status: 401,
        message: "Invalid password",
      };
    }
    const token = jwt.sign({ userId: existingAgent._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    return {
      status: 200,
      message: "Successfully logged in",
      token: token,
      data: existingAgent,
    };
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
    const bookings = await BusBooking.find({ userId: agent.id, bookingStatus: "paid" })
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
    const agents = await Agent.find();
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
