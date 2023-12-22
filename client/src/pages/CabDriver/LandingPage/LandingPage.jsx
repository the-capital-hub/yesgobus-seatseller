import React from 'react'
import './LandingPage.scss'
import placeholder from '../../../assets/CabDriver/placeholder/index'

function LandingPage() {
  return (
    <div className='cab_driver_landing_pg  '>
        <div className='image_with_text'>
<img src={placeholder.map} alt="map" />
<h4>Turn On Your Location</h4>
<p>To Continues,  let your device turn on location using Google’s location services</p>
        </div>
        <div className='buttons '>
<button className='on'>Yes , Turn It On</button>
<button className='cancel'>Cancel</button>
        </div>

    </div>
  )
}

export default LandingPage