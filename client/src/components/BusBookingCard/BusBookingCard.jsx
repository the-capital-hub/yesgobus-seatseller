import { useEffect, useState } from "react";
import { livelocation } from "../../assets/busbooking";
import BusBookingCardInfo from "../BusBookingCardInfo/BusBookingCardInfo";
import DropDown from "../DropDown/DropDown";
import "./BusBookingCard.scss";
import Seats from "../Seats/Seats";
import axiosInstance from "../../utils/service";
import { Spin } from "antd";
import toast, { Toaster } from 'react-hot-toast';
import { getVrlSeatLayout } from "../../api/vrlBusesApis";

const BusBookingCard = ({
  tripId,
  // inventoryType,
  sourceCity,
  sourceCityId,
  destinationCity,
  destinationCityId,
  doj,
  title,
  busName,
  busType,
  rating,
  noOfReviews,
  pickUpTime,
  pickUpLocation,
  travelTime,
  reachTime,
  reachLocation,
  price,
  seatsLeft,
  avlWindowSeats,
  cancellationPolicy,
  // pickUpTimes,
  pickUpLocationOne,
  // pickUpLocationTwo,
  // dropTimes,
  dropLocationOne,
  // dropLocationTwo,
  backSeat,
  fare,
  isVrl = false,
  ReferenceNumber
}) => {
  const [showSeats, setShowSeats] = useState(false);
  const [seatDetails, setSeatDetails] = useState([]);
  const [seatLoading, setSeatLoading] = useState(false);
  const [availableSeats, setAvailableSeats] = useState(seatsLeft);

  const priceToDisplay = (fare) => {
    const prices = fare;
    if (prices?.length === 1) {
      return prices[0].toFixed(2);
    } else {
      const minPrice = Math.min(...prices).toFixed(2);
      const maxPrice = Math.max(...prices).toFixed(2);
      return `${minPrice} - ${maxPrice}`;
    }
  };

  const fetchSeatData = async () => {
    if (!showSeats === false) {
      setShowSeats(!showSeats);
      return;
    }
    setSeatLoading(true);
    let seatData = [];
    // const requestBody = {
    //   sourceCity: sourceCity,
    //   destinationCity: destinationCity,
    //   doj: doj,
    //   inventoryType: inventoryType,
    //   routeScheduleId: routeScheduleId,
    // }
    try {

      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/busBooking/getSeatLayout/${tripId}`,
      );

      // check if tripdetails is array?
      seatData = response.data?.seats;
      // check if seat.available is boolean or string
      const availableSeats = seatData?.filter(seat => seat.available === "true");

      setAvailableSeats(availableSeats?.length);
      setSeatDetails(seatData);
      setSeatLoading(false);
      setShowSeats(!showSeats);
    } catch (error) {
      if (error.response) {
        toast.error(`Server Error: ${error.response.status}`, {
          duration: 2000,
          position: 'top-center',
          style: {
            background: 'red',
            color: 'white',
          },
        });
        console.error("Server Error:", error.response.data);
        setSeatLoading(false);
      } else if (error.request) {
        toast.error('Network Error: Unable to connect to the server', {
          duration: 2000,
          position: 'top-center',
          style: {
            background: 'red',
            color: 'white',
          },
        });
        setSeatLoading(false);
        console.error("Network Error:", error.request);
      } else {
        toast.error('An unexpected error occurred', {
          duration: 2000,
          position: 'top-center',
          style: {
            background: 'red',
            color: 'white',
          },
        });
        setSeatLoading(false);
        console.error("Something went wrong:", error);
      }
    }
  };

  const [vrlSeatLayout, setVrlSeatLayout] = useState([]);
  const [vrlPrices, setVrlPrices] = useState([0]);

  const getVrlSeats = async () => {
    const seatsResponse = await getVrlSeatLayout({
      referenceNumber: ReferenceNumber,
    });
    setVrlSeatLayout(seatsResponse.data.ITSSeatDetails);
    const uniqueBaseFaresSet = new Set();
    seatsResponse.data.ITSSeatDetails.forEach(seatDetail => {
      uniqueBaseFaresSet.add(seatDetail.BaseFare);
    });
    const uniqueBaseFares = Array.from(uniqueBaseFaresSet);
    setVrlPrices(uniqueBaseFares);
  }
  useEffect(() => {
    if (isVrl) {
      getVrlSeats();
    }
  }, [])

  return (
    <div className={`BusBookingCard ${showSeats && "bg-lightgrey"}`}>
      <h1>{title}</h1>
      <div className="cardContainer">
        <div className="cardWrapper">
          <BusBookingCardInfo
            title={busType}
            // title={busName}
            // subtitle={busType}
            rating={rating}
            reviews={noOfReviews}
            subtitleLeft
          />
          <div className="otherCards">
            <BusBookingCardInfo subtitle={pickUpLocation} title={pickUpTime} />
            {/* <BusBookingCardInfo img={true} title={travelTime} /> */}
            <BusBookingCardInfo title={travelTime} />
            <BusBookingCardInfo subtitle={reachLocation} title={reachTime} />
            <p className="price">₹{isVrl ? priceToDisplay(vrlPrices) : price}</p>
            <BusBookingCardInfo
              setShowSeats={fetchSeatData}
              buttonText={!availableSeats || (!seatDetails && "Full")}
              showSeats={showSeats}
              button={true}
              subtitle={availableSeats || "No seats left"}
            />
          </div>
        </div>
        <div className={`card-wrapper-mobile`} onClick={() => fetchSeatData()}>
          <h6 className="title">
            <span className="text-orange">YESGO</span>BUS
          </h6>
          <div className="time-and-price">
            <h4>
              {pickUpTime} ─ {reachTime}
            </h4>
            <span className="price-container">
              <p>From</p>{" "}
              <p className="price">₹ {isVrl ? priceToDisplay(vrlPrices) : price}</p>
            </span>
          </div>
          <div className="duration-and-seats-left">
            <span className="duration">{travelTime}</span>
            <span className="seats-left text-orange">{availableSeats} Seats</span>
          </div>
          <div className="bus-details-container">
            <div className="bus-details">
              <h4>{busName}</h4>
              <h4 className="lighter">{busType}</h4>
            </div>
            <div className="ratings-container">
              <span className="rating">
                ★ {(Math.random() * 1 + 4).toFixed(1)}
              </span>
              <span className="count">
                {Math.floor(Math.random() * 101) + 37}
              </span>
            </div>
          </div>
        </div>
        {/* <hr />
        <div style={{ marginBottom: "10px" }} className="liveLocation">
          <img src={livelocation} alt="" />
          <span>Live tracking</span>
        </div> */}
        <Spin
          spinning={seatLoading}
          // colorText="#fd5901"
          className="loading_seats"
        />
        {/* <hr /> */}
        {/* <div className="dropDowns">
          <DropDown title="Policy" text="Lorem" />
          <DropDown title="Photos" text="Lorem" />
          <DropDown title="Aminities" text="Lorem" />
          <DropDown title="Pickup & Drop" text="Lorem" />
          <DropDown title="Reviews" text="Lorem" />
        </div> */}
      </div>
      {showSeats && seatsLeft && seatDetails && (
        <Seats
          travelTime={travelTime}
          pickUpTime={pickUpTime}
          reachTime={reachTime}
          tripId={tripId}
          // routeScheduleId={routeScheduleId}
          // inventoryType={inventoryType}
          sourceCity={sourceCity}
          sourceCityId={sourceCityId}
          destinationCity={destinationCity}
          destinationCityId={destinationCityId}
          doj={doj}
          // pickUpTimes={pickUpTimes}
          pickUpLocationOne={Array.isArray(pickUpLocationOne) ? pickUpLocationOne : [pickUpLocationOne]}
          // pickUpLocationTwo={pickUpLocationTwo}
          // dropTimes={dropTimes}
          dropLocationOne={Array.isArray(dropLocationOne) ? dropLocationOne : [dropLocationOne]}
          // dropLocationTwo={dropLocationTwo}
          backSeat={backSeat}
          busName={busName}
          busType={busType}
          price={price}
          seatDetails={seatDetails}
          cancellationPolicy={cancellationPolicy}
          fare={fare}
        />
      )}
      <Toaster />
    </div>

  );
};

export default BusBookingCard;
