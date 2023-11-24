import "./Payment.scss";
import {
  BusBookingCard,
  BusRoute,
  Navbar,
  RoutesTitle,
  BusBookingCardInfo,
  SimpleCard,
  Input,
  Title,
  PopularRoutes,
  Footer,
  Button,
} from "../../components";
import { livelocation } from "../../assets/busbooking";
import AboveFooterImages from "../../components/AboveFooterImages/AboveFooterImages";
import { offer } from "../../assets/payment";
import axiosInstance from "../../utils/service";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spin } from "antd";
import { Modal } from "antd";

const Payment = () => {

  const [loading, setLoading] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  const [firstName, lastName] = loggedInUser.fullName.split(" ");
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);

  const [userData, setUserData] = useState({
    firstName_0: firstName || "",
    lastName_0: lastName || "",
    email: loggedInUser.email || "",
    mobile: loggedInUser.phoneNumber || "",
    gender: "M",
    idType: "PAN",
  });

  const [countdown, setCountdown] = useState(10);
  const [startCountdown, setStartCountdown] = useState(false);

  const updateCountdown = () => {
    if (countdown > 0) {
      setCountdown(countdown - 1);
    }
  };

  useEffect(() => {
    if (startCountdown) {
      const countdownTimer = setInterval(updateCountdown, 1000);
      return () => {
        clearInterval(countdownTimer);
      };
    }
  }, [startCountdown, countdown]);

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const {
    tripId,
    sourceCity,
    sourceCityId,
    destinationCity,
    destinationCityId,
    doj,
    pickUpTime,
    reachTime,
    travelTime,
    busType,
    busName,
    bookingDetails,
    cancellationPolicy,
    isVrl
  } = location.state || {};
  const [executed, setExecuted] = useState(false);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const blockTicketId = urlSearchParams.get("blockTicketId");
  const bookingId = urlSearchParams.get("bookingId");
  const paymentVerify = new URLSearchParams(location.search).has(
    "paymentVerify"
  );

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, []);

  function convertMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const journeyDay = Math.floor(hours / 24);
    const hour = hours % 24;
    const ampm = hour < 12 ? 'am' : 'pm';
    const displayHour = hour > 12 ? hour - 12 : hour;
    const formattedTime = `${displayHour.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${ampm}`;
    return formattedTime;
  }

  //verify payment and book ticket
  useEffect(() => {
    try {
      const paymentVerification = async () => {
        setLoading(true);
        // get bookings
        const getBookingDetails = await axiosInstance.get(
          `${import.meta.env.VITE_BASE_URL}/api/busBooking/getBookingById/${bookingId}`
        );
        if (getBookingDetails.status === 200) {
          const merchantTransactionId = getBookingDetails?.data?.data.merchantTransactionId;

          // check payment status
          const checkPaymentStatus = await axiosInstance.get(
            `${import.meta.env.VITE_BASE_URL
            }/api/payment/checkPaymentStatus/${merchantTransactionId}`
          );

          if (checkPaymentStatus.data.code === "PAYMENT_SUCCESS") {
            // console.log(`Block Ticket ID: ${blockTicketId}`);

            // book seat
            const bookSeat = await axiosInstance.post(
              `${import.meta.env.VITE_BASE_URL
              }/api/busBooking/bookSeat/${blockTicketId}`
            );

            // if booking is successfull
            if (bookSeat.data.status === "success") {

              // update booking in the db
              const { data: updatePaymentDetails } = await axiosInstance.patch(
                `${import.meta.env.VITE_BASE_URL
                }/api/busBooking/updateBooking/${bookingId}`,
                {
                  bookingStatus: "paid",
                  tin: bookSeat?.data.TIN,
                  // buspnr: bookSeat?.data.buspnr,
                  // opPNR: bookSeat?.data.BookingDetail.opPNR,
                }
              );
              const { data: ticketDetails } = await axiosInstance.get(
                `${import.meta.env.VITE_BASE_URL}/api/busBooking/getBookingById/${bookingId}`
              )

              if (ticketDetails) {
                // send mail
                const mailBody = {
                  fullName: updatePaymentDetails?.data.customerName,
                  sourceCity: updatePaymentDetails?.data.sourceCity,
                  destinationCity: updatePaymentDetails?.data.destinationCity,
                  seats: updatePaymentDetails?.data.selectedSeats,
                  amount: updatePaymentDetails?.data.totalAmount,
                  pickUpLocation: ticketDetails?.data.pickUpLocation,
                  opPNR: ticketDetails?.data.pnr,
                  doj: formatDate(updatePaymentDetails?.data.doj) + " " + updatePaymentDetails?.data.pickUpTime,
                  to: updatePaymentDetails?.data.customerEmail,
                }
                const sendMail = await axiosInstance.post(
                  `${import.meta.env.VITE_BASE_URL
                  }/api/busBooking/sendBookingConfirmationEmail`,
                  mailBody
                );

                //send sms
                const messageBody = {
                  fullName: updatePaymentDetails?.data.customerName,
                  sourceCity: updatePaymentDetails?.data.sourceCity,
                  destinationCity: updatePaymentDetails?.data.destinationCity,
                  seats: updatePaymentDetails?.data.selectedSeats,
                  amount: updatePaymentDetails?.data.totalAmount,
                  pickUpLocation: ticketDetails?.data.pickUpLocation,
                  opPNR: ticketDetails?.data.pnr,
                  doj: formatDate(updatePaymentDetails?.data.doj) + " " + updatePaymentDetails?.data.pickUpTime,
                  to: updatePaymentDetails?.data.customerPhone,
                }
                const sendMessage = await axiosInstance.post(
                  `${import.meta.env.VITE_BASE_URL
                  }/api/busBooking/sendBookingConfirmationMessage`,
                  messageBody,
                );
              }
              // navigate to payment successfull page
              setLoading(false);
              navigate(`/busbooking/payment/success?bookingId=${bookingId}`);
            } else {
              setLoading(false);
              navigate("/busbooking/payment/failure");
            }
          } else {
            navigate("/busbooking/payment/failure");
            setLoading(false);
            // alert("Payment Failed");
          }
        }
      };
      if (paymentVerify) {
        paymentVerification();
      }
    } catch (error) {
      console.log(error);
      navigate("/busbooking/payment/failure");
    }

  }, [paymentVerify]);

  const date = new Date();

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  //handle payment
  const handlePayment = async () => {

    //validate input
    const errors = validateUserData();
    if (errors.femaleReserved === true) {
      setErrorMessage("Seat is reserved for ladies");
      return;
    }

    if (Object.keys(errors).length > 0) {
      alert("Please fill in all the traveler details.");
      return;
    }
    setStartCountdown(true);
    setLoadingModalVisible(true);
    //seats data
    const seatObjects = bookingDetails?.selectedSeats?.map((seatId, index) => {
      const isPrimary = index === 0;
      const title = userData[`gender_${index}`] === 'M' ? "Mr" : "Ms";
      return {
        // seatNbr: seatId,
        // ladiesSeat: bookingDetails?.ladiesSeat[index],
        // ac: bookingDetails?.ac[index],
        // sleeper: bookingDetails?.sleeper[index],
        // fare: bookingDetails?.seatFares[index],
        // totalFareWithTaxes: bookingDetails?.seatTotalFares[index],
        // name: userData[`firstName_${index}`],
        // age: userData[`age_${index}`],
        // sex: userData[`gender_${index}`],
        // lastName: userData[`lastName_${index}`],
        // mobile: userData.mobile,
        // title: title,
        // email: userData.email,
        // idType: "3456",
        // idNumber: userData.idNumber,
        // nameOnId: userData[`firstName_${index}`],
        // primary: isPrimary,

        seatname: seatId,
        fare: bookingDetails?.seatFares[index],
        ladiesSeat: bookingDetails?.ladiesSeat[index],
        passenger: {
          address: userData.address,
          age: userData[`age_${index}`],
          email: userData.email,
          gender: userData[`gender_${index}`],
          idNumber: "23543" || userData.idNumber,
          idType: "Pancard" || userData.idType,
          mobile: userData.mobile,
          name: userData[`firstName_${index}`] + " " + userData[`lastName_${index}`],
          primary: isPrimary,
          title: title,
        }

      };
    });
    try {
      // block seat request body
      const blockSeatRequestBody = {
        // sourceCity: sourceCity,
        // destinationCity: destinationCity,
        // doj: doj,
        // routeScheduleId: routeScheduleId,
        // boardingPoint: bookingDetails?.boardingPoint,
        // customerName: firstName,
        // customerLastName: lastName,
        // customerEmail: userData.email,
        // customerPhone: userData.mobile,
        // emergencyPhNumber: userData.alternativeNumber,
        // customerAddress: userData.address,
        // blockSeatPaxDetails: seatObjects,
        // inventoryType: inventoryType,
        availableTripID: tripId,
        boardingPointId: bookingDetails.boardingPoint.bpid,
        droppingPointId: bookingDetails.droppingPoint.bpid,
        destination: destinationCityId,
        source: sourceCityId,
        inventoryItems: seatObjects,
      };
      // block seat
      const blockSeat = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/api/busBooking/blockSeat`,
        blockSeatRequestBody
      );

      // change this when you get API key
      if (blockSeat?.data?.blockKey) {
        // setLoading(false);
        setLoadingModalVisible(true);
        const { data: bookResponse } = await axiosInstance.post(
          `${import.meta.env.VITE_BASE_URL}/api/busBooking/bookBus`,
          {
            // ...blockSeatRequestBody,
            blockKey: blockSeat.data.blockKey,
            userId: loggedInUser._id,
            totalAmount: bookingDetails?.totalFare,
            busOperator: busName,
            busType: busType,
            selectedSeats: bookingDetails.selectedSeats?.join(", "),
            pickUpTime: pickUpTime,
            reachTime: reachTime,
            droppingPoint: bookingDetails.droppingPoint,
            cancellationPolicy: cancellationPolicy,
            sourceCity: sourceCity,
            destinationCity: destinationCity,
            doj: doj,
            customerName: firstName,
            customerLastName: lastName,
            customerEmail: userData.email,
            customerPhone: userData.mobile,
            customerAddress: userData.address,
          }
        );

        //initiate payment
        const response = await axiosInstance.post(
          `${import.meta.env.VITE_BASE_URL}/api/payment/initiatePayment`,
          {
            amount: bookingDetails?.totalFare,
            redirectUrl: `https://yesgobus.com/busbooking/payment?blockTicketId=${blockSeat.data.blockKey}&bookingId=${bookResponse.data._id}&paymentVerify=1`,
          }
        );

        if (response.status === 200) {
          // update merchantTransactionId
          const updatePaymentDetails = await axiosInstance.patch(
            `${import.meta.env.VITE_BASE_URL
            }/api/busBooking/updateBooking/${bookResponse.data._id}`,
            {
              merchantTransactionId: response.data.data.merchantTransactionId,
            }
          );
          if (updatePaymentDetails.status === 200) {
            setLoadingModalVisible(false);
            setStartCountdown(false);
            setCountdown(10);
            window.open(
              response.data.data.instrumentResponse.redirectInfo.url,
              "_blank",
              "noopener noreferrer"
            );
          }
        } else {
          setLoading(false);
          setStartCountdown(false);
          setCountdown(10);
          // alert("Please try with other seat or bus.");
          setErrorMessage("Please try with other seat or bus.");
        }
      } else {
        setLoadingModalVisible(false);
        setStartCountdown(false);
        setCountdown(10);
        // alert("Seat is already blocked, Please try with other seat or bus.");
        setErrorMessage("Seat is already blocked or There is an issue with the operator, Please try with other seat or bus.");
      }
    } catch (error) {
      setLoadingModalVisible(false);
      console.log(error);
      console.error("Something went wrong:", error);
    }
  };

  const handleInputChange = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };


  //validation
  const validateUserData = () => {
    const numberOfTravelers = bookingDetails?.selectedSeats?.length;
    const errors = {};
    for (let index = 0; index < numberOfTravelers; index++) {
      const firstNameKey = `firstName_${index}`;
      const lastNameKey = `lastName_${index}`;
      const ageKey = `age_${index}`;
      const genderKey = `gender_${index}`;

      if (!userData[firstNameKey]?.trim()) {
        errors[firstNameKey] = `First name for Traveler ${index + 1} is required`;
      }
      if (!userData[lastNameKey]?.trim()) {
        errors[lastNameKey] = `Last name for Traveler ${index + 1} is required`;
      }
      if (!userData[ageKey]?.trim()) {
        errors[ageKey] = `Age for Traveler ${index + 1} is required`;
      }
      if (!userData[genderKey]?.trim()) {
        errors[genderKey] = `Gender for Traveler ${index + 1} is required`;
      }
      if (bookingDetails.ladiesSeat[index] === true && userData[genderKey] === "M") {
        errors.femaleReserved = true;
      }
    }

    if (!userData.email?.trim()) {
      errors.email = "Email is required";
    }

    if (!userData.mobile?.trim()) {
      errors.mobile = "Mobile is required";
    }
    if (!userData.address?.trim()) {
      errors.address = "Address is required";
    }
    return errors;
  };

  return (
    <div className="Payment">
      <Navbar />
      {/* <BusRoute
        locationOne={sourceCity}
        locationTwo={destinationCity}
        departureDate={doj}
        returnDate={"- - -"}
      /> */}
      <hr />
      <div className="container">
        <div className="containerleft">
          <h5>Review your booking</h5>
          <RoutesTitle
            locationOne={sourceCity}
            locationTwo={destinationCity}
            date={doj}
          />

          <div className="reviewsCard">
            <div className="reviewleft">
              <BusBookingCardInfo
                title={busName}
                subtitle={busType}
                rating={5}
                reviews={100}
              />
              <div className="to">
                <BusBookingCardInfo title={sourceCity} subtitle={pickUpTime} />
                <BusBookingCardInfo img={true} subtitle={travelTime} />
                <BusBookingCardInfo
                  title={destinationCity}
                  subtitle={reachTime}
                />
              </div>
              {/* <div className="liveLocation">
                <img src={livelocation} alt="" />
                <span>Live tracking</span>
              </div> */}
            </div>
            <div className="reviewright">
              <span>{bookingDetails?.selectedSeats?.length} Seat Selected</span>
              <span>{bookingDetails?.selectedSeats?.join(", ")}</span>
              <a href="">View Policies</a>
            </div>
          </div>

          <div className="destinations">
            <SimpleCard
              text={"Boarding Pass Details"}
              date={isVrl ? bookingDetails?.boardingPoint?.time : convertMinutesToTime(bookingDetails?.boardingPoint?.time)}
              // locationOne={bookingDetails.boardingPoint.location}
              locationTwo={bookingDetails?.boardingPoint?.bpName}
            />
            <SimpleCard
              text={"Drop Point Details"}
              date={isVrl ? bookingDetails?.droppingPoint?.time : convertMinutesToTime(bookingDetails?.droppingPoint?.time)}
              // locationOne={bookingDetails.droppingPoint.location}
              locationTwo={bookingDetails?.droppingPoint?.bpName}
            />
          </div>

          {/* Traveller details */}
          <div className="details">
            <h4>Enter Traveller Details:</h4>
            {bookingDetails?.selectedSeats?.map((seat, index) => (
              <div key={index} className="travelerDetails">
                <h3 style={{ textAlign: "center" }}>Traveler {index + 1} | Seat {seat}</h3><br />
                <div className="detailsContainer">

                  <Input
                    title={"First Name"}
                    type={"text"}
                    placeholder={"First name"}
                    onChanged={(e) => handleInputChange(e, `firstName_${index}`)}
                    givenName={`firstName_${index}`}
                    value={userData[`firstName_${index}`] || ''}
                  />
                  <Input
                    title={"Last Name"}
                    type={"text"}
                    placeholder={"Last name"}
                    onChanged={(e) => handleInputChange(e, `lastName_${index}`)}
                    givenName={`lastName_${index}`}
                    value={userData[`lastName_${index}`] || ''}
                  />
                  <Input
                    title={"Age"}
                    type={"number"}
                    placeholder={"Enter Age"}
                    onChanged={(e) => handleInputChange(e, `age_${index}`)}
                    givenName={`age_${index}`}
                    value={userData[`age_${index}`] || ''}
                  />
                  <div className="genderContainer">
                    <label htmlFor={`gender_${index}`}>Gender</label>
                    <select
                      name={`gender_${index}`}
                      id={`gender_${index}`}
                      value={userData[`gender_${index}`] || ''}
                      onChange={(e) => handleInputChange(e, `gender_${index}`)}
                    >
                      <option value="">Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* Contact Details */}
          <div className="details">
            <h4>Enter Contact Details</h4>
            <div className="detailsContainer">
              <Input
                title={"Email"}
                type={"text"}
                placeholder={"example@email.com"}
                onChanged={handleInputChange}
                givenName={"email"}
                value={userData.email}
              />
              <Input
                title={"Mobile Number"}
                type={"number"}
                placeholder={"1234567890"}
                onChanged={handleInputChange}
                givenName={"mobile"}
                value={userData.mobile}
              />
              {/* <Input
                title={"Altername Number"}
                type={"number"}
                placeholder={"1234567890"}
                onChanged={handleInputChange}
                givenName={"alternativeNumber"}
              /> */}
              <Input
                title={"Address"}
                type={"text"}
                placeholder={"Address"}
                onChanged={handleInputChange}
                givenName={"address"}
              />
            </div>
          </div>

          {/* Picode Details */}
          {/* <div className="details">
            <div class="label-container">
              <span>Enter ID Proof</span>
              <label className="optional">*optional</label>
            </div>
            <div className="detailsContainer">
              <div className="genderContainer">
                <label htmlFor="gender">ID Type</label>
                <select
                  name="idType"
                  id="idType"
                  value={userData.idType}
                  onChange={handleInputChange}
                >
                  <option value="PAN">Pan</option>
                  <option value="AADHAAR">Aadhaar</option>
                </select>
              </div>
              <Input
                title={"ID Number"}
                type={"text"}
                placeholder={"ID Number"}
                onChanged={handleInputChange}
                givenName={"idNumber"}
              />
            </div>
          </div> */}

          {/* Trip Type */}
          {/* <div className="tripType">
            <span>Trip Type</span>
            <hr />
            <div className="checks">
              <div>
                <input
                  className="checkbox-round"
                  type="checkbox"
                  id="checkOne"
                />
                <label htmlFor="checkOne">Personal</label>
              </div>
              <div>
                <input
                  className="checkbox-round"
                  type="checkbox"
                  id="checkTwo"
                />
                <label htmlFor="checkTwo">Business</label>
              </div>
            </div>
          </div> */}
        </div>
        <div className="containerright">
          <div className="paymentCard">
            <h2>Price</h2>
            <hr />
            <div className="prices">
              <div className="price">
                <p>Total Basefare</p>
                <p>{"₹" + bookingDetails?.fare}</p>
              </div>
              <hr />
              {bookingDetails?.serviceTax !== 0 &&
                <div className="price">
                  <p>Service Tax</p>
                  <p>{bookingDetails?.serviceTax}</p>
                </div>
              }

              {bookingDetails?.operatorTax !== 0 &&
                <div className="price">
                  <p>Operator Tax</p>
                  <p>{bookingDetails?.operatorTax}</p>
                </div>
              }

              <hr />
              <div className="price">
                <p>Total Basefare</p>
                <p>{bookingDetails?.totalFare}</p>
              </div>
              <hr />
            </div>
          </div>

          {/* <div className="paymentCard">
            <h2>OFFERS</h2>
            <div className="promo">
              <div className="heading">
                <img src={offer} alt="" />
                <p>Enter Promo Code</p>
              </div>
              <hr />
              <input type="text" name="" id="" placeholder="Enter your code" />
            </div>
          </div> */}
          <Button
            text={`Pay Amount ₹${bookingDetails?.totalFare}`}
            onClicked={handlePayment}
          />
        </div>
      </div>
      {/* <div className="popularBusRoutes">
        <Title title={"Popular Bus Routes"} subtitle={"View More"} />

        <div className="popularBusRoutesContainer">
          <PopularRoutes busname={"Mumbai Bus"} to={"Goa, Pune, Bangalore"} />
          <PopularRoutes
            busname={"Hyderabad Bus"}
            to={"Ananthapur, Kurnool, Shadnagar"}
          />
          <PopularRoutes
            busname={"Chennai Bus"}
            to={"Bangarapet, Jolarpettai, Katpadi"}
          />
          <PopularRoutes
            busname={"Trivandrum Bus"}
            to={"Salem, Coimbatore, Kochi"}
          />
          <PopularRoutes
            busname={"Mangalore Bus"}
            to={"Kunigal, Hassan, Sakaleshpura"}
          />
        </div>
      </div> */}

      <Footer />
      {loading ? (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      ) : null}
      <Modal
        open={loadingModalVisible}
        closable={false}
        footer={null}
        centered
        maskClosable={false}
        className="loading-modal"
      >
        <p className="loading-message">Loading... Taking you to the payment page in {countdown} seconds.</p>
      </Modal>
      {errorMessage && (
        <div className="modal" onClick={() => setErrorMessage('')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setErrorMessage('')}>Close</span>
            <p className="error-message">{errorMessage}</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Payment;
