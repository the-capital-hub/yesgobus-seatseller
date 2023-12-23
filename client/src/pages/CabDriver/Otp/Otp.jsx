import React from "react";
import "./Otp.scss";
import placeholder from "../../../assets/CabDriver/placeholder/index";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
function Otp() {
  const navigate = useNavigate();
  const handleCallButtonClick = () => {
    window.location.href = `tel:45469875214`;
  };
  return (
    <div className="Otp">
      <div className="back_btn" onClick={() => navigate(-1)}>
        <FaArrowLeft size={20} />
      </div>
      <img src={placeholder.map2} alt="map" />
      <div className="otp_data">
        <p>On the way to pickup</p>
        <div className="otp_input_card">
            <input type="text" name="otp" id="otp" placeholder="otp"/>
        </div>
        <div className="buttons">
          <button className="call_btn"  onClick={handleCallButtonClick}>Call</button>

          <NavLink to={"/cab_driver/on_the_way"}>
            <button>Start Ride</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Otp;
