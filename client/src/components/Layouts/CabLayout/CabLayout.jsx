import { useReducer } from "react";
import { Outlet } from "react-router-dom";

const initialState = {
  destination: "",
  currentLocation: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DESTINATION":
      return { ...state, destination: action.payload };
    case "SET_CURRENT_LOCATION":
      return { ...state, currentLocation: action.payload };
    default:
      return state;
  }
};

const CabLayout = () => {
  const [rideLocations, dispatch] = useReducer(reducer, initialState);

  const setDestination = (destination) => {
    dispatch({ type: "SET_DESTINATION", payload: destination });
  };

  const setCurrentLocation = (location) => {
    dispatch({ type: "SET_CURRENT_LOCATION", payload: location });
  };

  return (
    <div className="cab-layout">
      <Outlet context={{ rideLocations, setDestination, setCurrentLocation }} />
    </div>
  );
};

export default CabLayout;
