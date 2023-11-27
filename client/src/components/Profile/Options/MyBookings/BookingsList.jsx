import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WatermarkIcon } from "../../../../assets/contact";
import { cancelTicket } from "../../../../api/authentication";
import { Modal, Button, Spin } from "antd";
import { vrlCancelDetails, vrlConfirmCancel } from "../../../../api/vrlBusesApis";
export default function BookingsList({ bookingData, selectedTab, setCancelled, cancelled }) {
  const [loading, setLoading] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [ticketToCancel, setTicketToCancel] = useState(null);
  const [vrlTicketCancelData, setVrlTickerCancelData] = useState(null);
  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const handleCancelTicket = async (bookingData, tid, isVrl, pnr) => {
    if (isVrl) {
      let { data: vrlCancelDetailsResponse } = await vrlCancelDetails({
        pnrNo: pnr
      });
      vrlCancelDetailsResponse = vrlCancelDetailsResponse[0];
      if (vrlCancelDetailsResponse.Status === 2) {
        alert("Unable to Cancel Ticket Because Minimum Cancelation Minute is reached.");
        return;
      }
      setVrlTickerCancelData(vrlCancelDetailsResponse);
      setTicketToCancel(bookingData);
      setIsCancelModalVisible(true);
    } else {
      setTicketToCancel(bookingData);
      setIsCancelModalVisible(true);
    }
  };

  const confirmCancelTicket = async () => {
    setLoading(true);
    try {
      if (ticketToCancel.isVrl) {
        const refundData = {
          merchantTransactionId: ticketToCancel.merchantTransactionId,
        };
        const cancelData = {
          pnrNo: ticketToCancel.opPNR
        };
        let { data: vrlCancelDetailsResponse } = await vrlConfirmCancel(cancelData, refundData);
        if (vrlCancelDetailsResponse.Status === 2) {
          alert(vrlCancelDetailsResponse.Message);
          return;
        }
      } else {
        const seatNbrsToCancel = ticketToCancel.selectedSeats.split(',').map(seat => seat.trim());
        const cancelTicketData = {
          etsTicketNo: ticketToCancel.tid,
          seatNbrsToCancel: seatNbrsToCancel,
        };
        const refundData = {
          merchantTransactionId: ticketToCancel.merchantTransactionId,
        };
        const cancelTicketResponse = await cancelTicket(refundData, cancelTicketData, ticketToCancel._id);
        if (cancelTicketResponse.status === 200) {
          alert("Booking Cancelled. Refund will be processed soon");
          setCancelled(!cancelled);
        }
      }
    } catch (error) {
      alert("Oops, this ticket cannot be cancelled");
      console.log(error);
    } finally {
      setLoading(false);
      setIsCancelModalVisible(false);
    }
  };

  const handleCancelModalClose = () => {
    setVrlTickerCancelData(null);
    setIsCancelModalVisible(false);
  };

  const TicketOptions = ({ selectedTab, bookingData, tid, isVrl, pnr }) => {
    if (selectedTab === "upcoming") {
      return (
        <>
          <Link to={`/busbooking/ticket?bookingId=${bookingData._id}`}>
            <button className="orange-btn">Download Ticket</button>
          </Link>
          <button className="red-btn" onClick={() => handleCancelTicket(bookingData, tid, isVrl, pnr)}>Cancel Ticket</button>
        </>
      );
    } else if (selectedTab === "completed") {
      return (
        <>
          <Link to={`/busbooking/ticket?bookingId=${bookingData._id}`}>
            <button className="orange-btn">Download Ticket</button>
          </Link>
          <button className="green-btn">Completed</button>;
        </>
      )
    } else if (selectedTab === "cancelled") {
      return <button className="red-btn">Cancelled</button>;
    }
  };

  return (
    <div className="booking__details">
      {/* Logo */}
      <div className="logo">
        <img
          src={WatermarkIcon}
          alt=""
          style={{ width: "100px", margin: "0.5em" }}
        />
      </div>
      <div className="booking-details-container">
        {bookingData?.[selectedTab]?.map((booking, index) => (
          <div key={index}>
            {/* Journey details */}
            <div className="journey__details">
              <h1>
                {booking.sourceCity} to {booking.destinationCity}
              </h1>
              <p>{formatDate(booking.doj)}</p>
            </div>

            {/* Bus class */}
            <div className="bus__details">
              <h3>{booking.busOperator}</h3>
              <p>{booking.busType}</p>
            </div>

            <div
              className="ticket__options"
              style={{
                justifyContent: `${selectedTab === "upcoming" ? "" : "center"}`,
              }}
            >
              <TicketOptions selectedTab={selectedTab} bookingData={booking} tid={booking.tid} isVrl={booking.isVrl} pnr={booking.opPNR} />
            </div>
          </div>
        ))}
      </div>
      {loading ? (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      ) : null}

      {/* Cancelation Confirmation Modal */}
      <Modal
        title="Confirm Ticket Cancellation"
        visible={isCancelModalVisible}
        onCancel={handleCancelModalClose}
        footer={[
          <Button key="cancel" onClick={handleCancelModalClose}>
            Cancel
          </Button>,
          <Button
            key="confirm"
            type="primary"
            style={{ backgroundColor: 'red', borderColor: 'red' }}
            onClick={confirmCancelTicket}
          >
            Confirm
          </Button>,
        ]}
      >
        <div>
          <p>Are you sure you want to cancel this ticket?</p>
          {vrlTicketCancelData && (
            <div>
              <p>Total Fare: {vrlTicketCancelData.TotalFare}</p>
              <p>Refund Amount: {vrlTicketCancelData.RefundAmount}</p>
              <p>Seat Names: {vrlTicketCancelData.SeatNames}</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
