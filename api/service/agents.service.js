import Agent from "../modals/agents.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerAgent = async (agentData) => {
  try {
    const existingAgent = await Agent.findOne({
      $or: [{ email: agentData.email }, { phNum: agentData.phNum }],
    });
    if (!existingAgent) {
      const hashedPassword = bcrypt.hashSync(agentData.password, 5);
      const newAgent = new Agent({
        ...agentData,
        password: hashedPassword,
      });
      await newAgent.save();
      return {
        status: 200,
        message: "Registration Successful",
        data: newAgent,
      };
    } else {
      return {
        status: 200,
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