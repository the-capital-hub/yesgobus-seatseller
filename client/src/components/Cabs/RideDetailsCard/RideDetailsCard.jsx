import React from "react";
import "./RideDetailsCard.scss";
import { CiSquareAlert } from "react-icons/ci";

function RideDetailsCard({ image, time, title, secondTitle, price }) {
  return (
    <div className="RideDetailsCard">
      <div className="car_data">
        <div className="cab_with_time">
          <img src={image} alt={image} />
          <p>3 min</p>
        </div>
        <div className="title_text">
          <h4>{title}</h4>
          <p>{secondTitle}</p>
        </div>
        <div className="pricing">
          <CiSquareAlert size={18} />
          <h5>&#8377;{price}</h5>
        </div>
      </div>
    </div>
  );
}

export default RideDetailsCard;
