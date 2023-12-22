import { useEffect, useReducer, useState } from "react";
import { Outlet } from "react-router-dom";
import "./CabDriverRoutesLayout.scss";
import { Capacitor } from "@capacitor/core";

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

const CabDriverRoutesLayout = () => {
  const [rideLocations, dispatch] = useReducer(reducer, initialState);
  const [isMobielApp, setIsMobileApp] = useState(true);
  const setDestination = (destination) => {
    dispatch({ type: "SET_DESTINATION", payload: destination });
  };

  const setCurrentLocation = (location) => {
    dispatch({ type: "SET_CURRENT_LOCATION", payload: location });
  };

  useEffect(() => {
    const currentPlatform = Capacitor.getPlatform();

    if (currentPlatform === "android" || currentPlatform === "ios") {
      setIsMobileApp(true);
      console.log(`Running on ${currentPlatform}`);
    } else {
      setIsMobileApp(false);
      console.log("Not running on Android or iOS");
    }
  }, []);

  // if(!isMobielApp) {
  //   return ======
  // }

  return (
    <div className="cab-layout">
      <Outlet context={{ rideLocations, setDestination, setCurrentLocation }} />
    </div>
  );
};

export default CabDriverRoutesLayout;
