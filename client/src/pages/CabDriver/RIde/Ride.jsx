import React from 'react'
import './ride.scss'
import placeholder from '../../../assets/cabs/placeholder/index'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Ride() {
    const navigate = useNavigate();

  return (
    <div className='cabe_driver_ride_section'>
         <div className="back_btn" onClick={() => navigate(-1)}>
        <FaArrowLeft size={20} />
      </div>
<img src={placeholder.map} alt="map" />
<div className='ride_section'>
<h3>Rides</h3>
<p>You new booking cards show here</p>

<button><NavLink to={"/cab_driver/trip_requirment"}>Open Floating Bubble</NavLink></button>

          
<button>Wait for the order !</button>
</div>
    </div>
  )
}

export default Ride