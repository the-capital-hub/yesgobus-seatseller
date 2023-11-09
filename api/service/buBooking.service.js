import axios from "axios";
import BusBooking from "../modals/busBooking.modal.js";
import City from "../modals/cities.modal.js";
import Tickets from "../modals/ticket.modal.js";

const sendRequest = async (url, method, data) => {
  try {
    const headers = {
      // 'Token': process.env.ZUELPAY_TOKEN,
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
    };
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: data,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.message;
  }
};

export const getCityList = async () => {
  const requestData = {};
  const url = "http://api.seatseller.travel/cities";
  return sendRequest(url, "GET", requestData);
};

export const getAliasesCity = async () => {
  const requestData = {};
  const url = "http://api.seatseller.travel/aliases";
  return sendRequest(url, "GET", requestData);
};

export const searchBus = async (sourceId, destinationId, doj) => {
  const url = `http://api.seatseller.travel/availabletrips?source=${sourceId}&destination=${destinationId}&doj=${doj}`;
  return sendRequest(url, "GET", null);
};

export const getSeatLayout = async (id) => {
  const url = `http://api.seatseller.travel/tripdetails?id=${id}`;
  return sendRequest(url, "GET", null);
};

export const getBpDpDetails = async (id) => {
  const url = `http://api.seatseller.travel/bpdpDetails?id=${id}`;
  return sendRequest(url, "GET", null);
};

export const getSeatLayoutV2 = async (args) => {
  const url = "http://api.seatseller.travel/tripdetailsV2";
  return sendRequest(url, "POST", args);
};

export const blockSeat = async (args) => {
  const url = "http://api.seatseller.travel/blockTicket";
  return sendRequest(url, "POST", args);
};

export const getRTCFareBreakup = async (blockKey) => {
  const url = `http://api.seatseller.travel/rtcfarebreakup?blockKey=${blockKey}`;
  return sendRequest(url, "GET", null);
};

export const bookSeat = async (blockKey) => {
  const url = `http://api.seatseller.travel/bookticket?blockKey=${blockKey}`;
  return sendRequest(url, "POST", null);
};

export const cancelTicketData = async (tin) => {
  const url = `http://api.seatseller.travel/cancellationdata?tin=${tin}`;
  return sendRequest(url, "GET", null);
};

export const cancelTicket = async (args) => {
  const url = `http://api.seatseller.travel/cancelticket`;
  return sendRequest(url, "POST", args);
};

export const getTicket = async (tin) => {
  const url = `http://api.seatseller.travel/ticket?tin=${tin}`;
  return sendRequest(url, "GET", null);
};

export const checkBookedTicket = async (blockKey) => {
  const url = `http://api.seatseller.travel/checkBookedTicket?blockKey=${blockKey}`;
  return sendRequest(url, "GET", null);
};

export const busCancellationInfo = async (from, to) => {
  const url = `http://api.seatseller.travel/busCancellationInfo?from=${from}&to=${to}`;
  return sendRequest(url, "GET", null);
};

export const getBusFilters = async (args) => {
  try {
    const [sourceCity, destinationCity] = await Promise.all([
      City.findOne({ CityName: args.sourceCity }),
      City.findOne({ CityName: args.destinationCity }),
    ]);
    const searchResponse = await searchBus(sourceCity.id, destinationCity.id, args.doj);
    const filters = {
      boardingPoints: [],
      droppingPoints: [],
      busPartners: [],
      busType: [],
    };

    if (searchResponse.availableTrips && searchResponse.availableTrips.length > 0) {
      searchResponse.availableTrips.forEach((bus) => {
        if (bus.boardingTimes && bus.boardingTimes.length > 0) {
          bus.boardingTimes.forEach((point) => {
            filters.boardingTimes.push(point.location);
          });
        }
        if (bus.droppingTimes && bus.droppingTimes.length > 0) {
          bus.droppingTimes.forEach((point) => {
            filters.droppingTimes.push(point.location);
          });
        }
        filters.busPartners.push(bus.travels);
        filters.busType.push(bus.busType);
      });
    }
    filters.boardingPoints = [...new Set(filters.boardingPoints)];
    filters.droppingPoints = [...new Set(filters.droppingPoints)];
    filters.busPartners = [...new Set(filters.busPartners)];
    filters.busType = [...new Set(filters.busType)];
    return {
      status: 200,
      data: filters,
      sourceCity: sourceCity.id,
      destinationCity: destinationCity.id,
    };
  } catch (error) {
    throw error.message;
  }
};

function hasFilters(filters) {
  return (
    filters.boardingPoints ||
    filters.droppingPoints ||
    filters.busPartners ||
    filters.minPrice ||
    filters.maxPrice
  );
}


export const getBusDetails = async (searchArgs, filters) => {
  try {
    const [sourceCity, destinationCity] = await Promise.all([
      City.findOne({ CityName: args.sourceCity }),
      City.findOne({ CityName: args.destinationCity }),
    ]);
    let searchResponse = await searchBus(sourceCity.id, destinationCity.id, searchArgs.doj);
    searchResponse = searchResponse.availableTrips;

    if (!hasFilters(filters)) {
      return {
        status: 200,
        data: searchResponse,
      };
    }
    const filteredBuses = searchResponse.filter((bus) => {

      const fareValues = bus.fares.split(",").map(parseFloat);
      const matchingPrice =
        (!filters.minPrice || fareValues.some((fare) => fare >= filters.minPrice)) &&
        (!filters.maxPrice || fareValues.some((fare) => fare <= filters.maxPrice));

      const matchingBoardingPoints = filters.boardingPoints
        ? filters.boardingPoints.some((point) =>
          bus.boardingTimes.some((bPoint) => bPoint.location === point)
        )
        : true;

      const matchingDroppingPoints = filters.droppingPoints
        ? filters.droppingPoints.some((point) =>
          bus.droppingTimes.some((dPoint) => dPoint.location === point)
        )
        : true;

      const matchingBusPartners = filters.busPartners
        ? filters.busPartners.includes(bus.travels)
        : true;

      const matchingBusType = filters.busTypes
        ? filters.busTypes.includes(bus.busType)
        : true;

      return (
        matchingPrice &&
        matchingBoardingPoints &&
        matchingDroppingPoints &&
        matchingBusPartners &&
        matchingBusType
      );
    });

    return {
      status: 200,
      data: filteredBuses,
    };
  } catch (error) {
    throw error.message;
  }
};

export const bookBus = async (bookingDetails) => {
  try {
    const booking = new BusBooking({
      ...bookingDetails
    });
    await booking.save();
    return {
      status: 200,
      message: "Booking details added",
      data: booking
    }
  } catch (error) {
    throw error.message;
  }
}

export const searchCity = async (searchParam) => {
  try {
    const cities = await City.find({
      CityName: { $regex: `^${searchParam}`, $options: 'i' }
    })
    return {
      status: 200,
      message: "City details retrieved",
      data: cities
    }
  } catch (error) {
    throw error.message;
  }
}

export const updateBookings = async (bookingId, bookingDetails) => {
  try {
    const updatedBooking = await BusBooking.findOneAndUpdate(
      { _id: bookingId },
      { $set: bookingDetails },
      { new: true }
    );
    if (!updatedBooking) {
      return {
        status: 404,
        message: "Booking not found",
        data: null,
      };
    }
    return {
      status: 200,
      message: "Booking updated",
      data: updatedBooking,
    };
  } catch (error) {
    throw error.message;
  }
};

export const getBookingById = async (bookingId) => {
  try {
    const booking = await BusBooking.findById(bookingId);
    if (!booking) {
      return {
        status: 404,
        message: "Booking not found",
        data: null,
      };
    }
    const ticket = await Tickets.findOne(booking.tin);
    if (!ticket) {
      const newTicketData = await getTicket(booking.tin);
      if (!newTicketData) {
        return {
          status: 404,
          message: "Booking not found",
          data: null,
        };
      }
      const newTicket = new Tickets({
        ...newTicketData
      });
      await newTicket.save();
    } else {
      return {
        status: 200,
        message: "Booking retrieved",
        data: ticket,
      };
    }
  } catch (error) {
    throw error.message;
  }
};


export const getAllBookings = async (userId) => {
  try {
    const booking = await BusBooking.find({ userId: userId, bookingStatus: { $ne: "pending" } });
    if (!booking) {
      return {
        status: 404,
        message: "Booking not found",
        data: null,
      };
    }
    return {
      status: 200,
      message: "Booking retrieved",
      data: booking,
    };
  } catch (error) {
    throw error.message;
  }
};
