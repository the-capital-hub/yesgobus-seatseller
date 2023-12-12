import React from 'react'
import './RideCancelCard.scss'
import { Progress } from 'antd';
import assets from '../../../assets/cabs/rideCancel/Index'
import { useNavigate } from 'react-router-dom';


function RideCancelCard() {
    const navigate = useNavigate();

 return (
<section className='ride_cancel_card'>
    <div className='heading'>
<p>Contacting Drivers Nearby... </p>
    </div>
    <div className='progress_bar'>
    <Progress percent={10} />
    </div>
    <div className='image_with_cancel'>
<img src={assets.driverLocation} alt="driver" width={200} />
<button onClick={() => navigate(-1)}>Cancel Ride</button>
    </div>

</section>  )
}

export default RideCancelCard