import React from 'react'
import './Pickup.scss'
import placeholder from '../../../assets/CabDriver/placeholder/index'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import RideDetailsCard from '../../../components/CabDriver/RideDetailsCard/RideDetailsCard';
function Pickup() {
    const navigate = useNavigate();

  return (
    <div className='Pickup'>
         <div className="back_btn" onClick={() => navigate(-1)}>
        <FaArrowLeft size={20} />
      </div>
        <img src={placeholder.map2} alt="map" />
       <div className='ride_data'>
       <RideDetailsCard  type={"Go for Pickup"}
  time={"Today at 10:30 am"}
  userName={"Demo User"}
  kmAwayFromUser={"0.1"}
  timeAwayFromUser={".1"}
  Money={200}
  pickupAddress={"2A CROSS, Tech city layout celebrity paradise layout"}
  pickupKmAwayFrom={"0.1"}
  pickupTimeAwayFrom={".1"}
  dropAddress={"2A CROSS, Tech city layout celebrity paradise layout"}
  dropKmAwayFrom={"0.1"}
  dropTimeAwayFrom={".1"}
  dropData={true}
  button1={"Call"}
  button2={"Go for pickup"}
  button1Link={"/cab_driver/pickup"}
  button2Link={"/cab_driver/otp"}
  button2backgroundColor={"#FD5901"}
  button1backgroundColor={"#008000"}
  buttons={true}


  />
       </div>
       
    </div>

  )
}

export default Pickup