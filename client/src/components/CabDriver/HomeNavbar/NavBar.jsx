import React from 'react'
import './NavBar.scss'

function NavBar() {
  return (
    <div className='cab_driver_navbar'>
<div className='user_greeting'>
    <h5 className='greetings'>Good morning,</h5>
    <h6>Karthik</h6>
</div>
<div>
    <img src={"https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="User" />
</div>
    </div>
  )
}

export default NavBar