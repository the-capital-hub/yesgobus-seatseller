import React, { useState } from "react";
import "./VehicleSelector.scss";

function VehicleSelector({onVehicleSelectionChange }) {
// State for selected category and vehicle
const [selectedCategory, setSelectedCategory] = useState("Sedan");
const [selectedVehicle, setSelectedVehicle] = useState("");

// Sample vehicle data
const vehicleOptions = {
  Sedan: ["Toyota Camry", "Honda Accord", "Nissan Altima"],
  SUV: ["Ford Explorer", "Chevrolet Tahoe", "Toyota RAV4"],
  Truck: ["Ford F-150", "Chevrolet Silverado", "Ram 1500"],
};

// Handle category change
const handleCategoryChange = (e) => {
  setSelectedCategory(e.target.value);
  // Reset selected vehicle when category changes
  setSelectedVehicle("");
  // Call the callback function to inform the parent component
  onVehicleSelectionChange("");
};

// Handle vehicle change
const handleVehicleChange = (e) => {
  const selectedVehicleValue = e.target.value;
  setSelectedVehicle(selectedVehicleValue);
  // Call the callback function to inform the parent component
  onVehicleSelectionChange(selectedVehicleValue);
};
  return (
    <div className="Vehicle_selector">
      <div className="selectors">
        {/* Category Dropdown */}
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Truck">Truck</option>
        </select>

        {/* Vehicle Dropdown */}
        <select
          id="vehicle"
          value={selectedVehicle}
          onChange={handleVehicleChange}
          disabled={!selectedCategory}
        >
          <option value="" disabled>
            Select a car
          </option>
          {vehicleOptions[selectedCategory].map((vehicle, index) => (
            <option key={index} value={vehicle}>
              {vehicle}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default VehicleSelector;
