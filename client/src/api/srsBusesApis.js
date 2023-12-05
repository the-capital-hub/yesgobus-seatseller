import axiosInstance from "../utils/service";

export const getSrsBuses = async (sourceCity, destinationCity, doj) => {
  try {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL}/api/busBooking/getSrsSchedules/${sourceCity}/${destinationCity}/${doj}`
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const getSrsSeatLayout = async (schedule_id) => {
  try {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL}/api/busBooking/getSrsSeatDetails/${schedule_id}`
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const getSrsAvailability = async (schedule_id) => {
  try {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL}/api/busBooking/getSrsAvailability/${schedule_id}`
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const srsBlockSeat = async (schedule_id, args) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BASE_URL}/api/busBooking/getSrsBlockSeat/${schedule_id}`,
      args
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

//pass pnr number receviced from block seat response
export const srsConfirmBooking = async (ticket_number) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BASE_URL}/api/busBooking/srsConfirmBooking/${ticket_number}`
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};