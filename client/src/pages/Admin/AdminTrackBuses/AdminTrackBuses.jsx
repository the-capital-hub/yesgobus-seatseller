import React from 'react'
import './AdminTrackBuses.scss'
import { Link } from 'react-router-dom';
import { Button } from 'antd';

function AdminTrackBuses() {
  return (
    <div className="track-buses-wrapper bg-white lg:rounded-xl my-4 mx-8 border border-solid border-gray-300">
    <div className="trackAgent-container flex flex-col gap-5 py-5">
      <h2 className="m-0">Tracking All Buses Booked</h2>

      <div className="list-container flex flex-col rounded-lg border border-solid border-gray-300 bg-white shadow-xl">
        <header className="list-bar grid grid-cols-5 place-items-center py-4 px-8 ">
          <p className="m-0 text-lg justify-self-start">No .of Buses </p>
          <p className="m-0 text-lg">Location Booked</p>
          <p className="m-0 text-lg">Starting Timings</p>
          <p className="m-0 text-lg">Reached Timings</p>
          <p className="m-0 text-lg">Track</p>

        </header>
        {Array(4)
          .fill(0)
          .map((elem, index) => {
            return (
              <div
                className="list-bar grid grid-cols-5 place-items-center py-4 px-8"
                key={`${elem}-${index}`}
              >
                <div className="flex items-center gap-4 justify-self-start">
                  <p className="m-0">{index + 1}.KA 0Z 4488</p>
                </div>
                <p className="m-0">Bangalore to Mysore</p>
                <p className="m-0">10:00am </p>
                <p className="m-0">10:00pm </p>

                <Link className="no-underline text-inherit justify-self-center w-[150px]">
                    <Button
                      htmlType="button"
                      shape="round"
                      size="large"
                      style={{ paddingInline: "3.5rem", background:"#FF0000" , color:"white" }}
                    >
                      Track
                    </Button>
                  </Link>
              </div>
            );
          })}
        <footer className="list-bar grid grid-cols-4 place-items-center py-8 px-8"></footer>
      </div>
    </div>
  </div>
  )
}

export default AdminTrackBuses