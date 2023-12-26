import React, { useState } from "react";
import "./Home.scss";
import VehicleSelector from "./component/VehicleSelector/VehicleSelector.jsx";
import placeholder from "../../../assets/cabs/placeholder/index.js";
import { NavLink } from "react-router-dom";

function Home() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [vehicleAssigned, setVehicleAssigned] = useState(false);

  const handleVehicleSelectionChange = (selectedVehicle) => {
    setIsButtonDisabled(!selectedVehicle);
  };

  return (
    <div className="cab_driver_home">
      <div className="assign_vehicle">
        {!vehicleAssigned ? (
          <>
            <h4>Assign Vehicle</h4>
            <p>
              Before going online, please select the vehicle category you want
              to work on.
            </p>
          </>
        ) : (
          <div className="VehicleAssigned">

            <h4>Vehicle Assigned</h4>
            <p>Click on go working screen and wait for the booking alerts</p>
            </div>

        )}
        {vehicleAssigned && <NavLink to={"/cab_driver/rides"}>
        <button>Go Working</button>
          </NavLink>}
      </div>
      <div className="map_with_selector">
        {!vehicleAssigned && (
          <div className="vehicle_selector">
            <VehicleSelector
              onVehicleSelectionChange={handleVehicleSelectionChange}
            />
          </div>
        )}
        <img src={placeholder.map} alt="Map of Assigned Vehicles" />
        {!vehicleAssigned ? (
          <button
            disabled={isButtonDisabled}
            onClick={() => {
              setVehicleAssigned(true);
            }}
          >
            Start Working
          </button>
        ) : (
          <button
            className="stop_btn"
            onClick={() => {
              setVehicleAssigned(false);
            }}
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
