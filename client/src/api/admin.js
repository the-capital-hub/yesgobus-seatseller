import axiosInstance from "../utils/service";

const ADMIN_ENDPOINTS = {
  agentRegister: "api/agent/register",
};

export const agentRegisterAPI = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BASE_URL}/${ADMIN_ENDPOINTS.agentRegister}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering agent", error);
  }
};
