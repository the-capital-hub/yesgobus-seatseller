import React from 'react'
import './TripRequirment.scss'
import placeholder from '../../../assets/CabDriver/placeholder/index'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import RideDetailsCard from '../../../components/CabDriver/RideDetailsCard/RideDetailsCard';
function TripRequirment() {
    const navigate = useNavigate();

  return (
    <div className='TripRequirment'>
         <div className="back_btn" onClick={() => navigate(-1)}>
        <FaArrowLeft size={20} />
      </div>
        <img src={placeholder.map3} alt="map" />
       <div className='ride_data'>
       <RideDetailsCard  type={"New Rides"}
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
  button1={"Accept"}
  button2={"Reject"}
  button1Link={"/cab_driver/pickup"}
  button2Link={"/cab_driver/rides"}
  button1backgroundColor={"#FD5901"}
  button2backgroundColor={"#F30303"}
  buttons={true}


  />
       </div>
       
    </div>

  )
}

export default TripRequirment