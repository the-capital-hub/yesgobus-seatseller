import axiosInstance from "../utils/service";

const baseUrl = import.meta.env.VITE_BASE_URL;

const ADMIN_ENDPOINTS = {
  agentRegister: "api/agent/register",
  agentLogin: "api/agent/login",
  getBalance: "api/agent/getBalance",
};

// Register Agent
export const agentRegisterAPI = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BASE_URL}/${ADMIN_ENDPOINTS.agentRegister}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering agent", error);
    throw error;
  }
};

// Agent Login
export const agentLoginAPI = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `${baseUrl}/${ADMIN_ENDPOINTS.agentLogin}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying credentials", error);
    throw error;
  }
};

//get balance
export const getBalanceAPI = async () => {
  try {
    const response = await axiosInstance.get(
      `${baseUrl}/${ADMIN_ENDPOINTS.getBalance}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting balance", error);
    throw error;
  }
};
