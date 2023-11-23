import axiosInstance from "../utils/service";

export const getVrlBuses = async (args) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BASE_URL}/api/busBooking/getVrlBusDetails`,
      args
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const getVrlBusFilters = async (args) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BASE_URL}/api/busBooking/getVrlFilters`,
      args
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const getVrlSeatLayout = async (args) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BASE_URL}/api/busBooking/sendVrlRequest/GetSeatArrangementDetailsV3`,
      args
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const vrlBlockSeat = async (args) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BASE_URL}/api/busBooking/sendVrlRequest/BlockSeatV2`,
      args
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const vrlBookSeat = async (args) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BASE_URL}/api/busBooking/sendVrlRequest/BookSeatV3`,
      args
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
