import React from "react";
import "./RideDetailsCard.scss";
import placeholder from "../../../assets/CabDriver/placeholder";
import { NavLink } from "react-router-dom";

function RideDetailsCard({
  type,
  time,
  userName,
  kmAwayFromUser,
  timeAwayFromUser,
  Money,
  pickupAddress,
  pickupKmAwayFrom,
  pickupTimeAwayFrom,
  dropAddress,
  dropKmAwayFrom,
  dropTimeAwayFrom,
  dropData,
  button1,
  button2,
  button1Link,
  button2Link,
  button1backgroundColor,
  button2backgroundColor,
  buttons,
  CODType



}) {
  const button1Style = {
    backgroundColor:   button1backgroundColor,
 
  };
  const button2Style = {
    backgroundColor:   button2backgroundColor,
 
  };
  return (
    <div className="cab_driver_ride_details">
      <div className="type_with_time">
        <h4>{type}</h4>
        <p>{time}</p>
      </div>
      <div className="user_ride_data_card">
        <h4>{userName}</h4>
        <p>
          {kmAwayFromUser}km away {timeAwayFromUser}min
        </p>
        <h4>Rs{Money}/-</h4>
      </div>
      <div className="pickup_data">
        <div>
        <img src={placeholder.reddot} alt="reddot" />
        <span>Pickup From</span>
        </div>
        <p>{pickupAddress}</p>
        <p>
          {pickupKmAwayFrom}km away {pickupTimeAwayFrom}min
        </p>
      </div>
      {dropData && (
        <div className="drop_data">
          <div>
          <img src={placeholder.greendot} alt="greendot" />
          <span>Drop From</span>
          </div>
          <p>{dropAddress}</p>
          <p>
            {dropKmAwayFrom}km away {dropTimeAwayFrom}min
          </p>
        </div>
      )}
      {
        buttons&&   <div className="buttons">
        <NavLink style={button1Style} to={button1Link}>
        <button  style={button1Style} >{button1}</button>
  
            </NavLink>
            <NavLink  style={button2Style}  to={button2Link}>
            <button  style={button2Style} >{button2}</button>
            </NavLink>
          
         
  
        </div>
      }
      {
        CODType&&<div className="CODTYPE">
          <p>Payment mode: <span> {CODType}</span></p>
          <button>
          Complete ride
          </button>
        </div>
      }
      
   
    </div>
  );
}

export default RideDetailsCard;
