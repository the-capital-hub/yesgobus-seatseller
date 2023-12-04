import { useState, useEffect } from "react";
import { twowayarrow } from "../../assets/busbooking";
import BusRouteCard from "../BusRouteCard/BusRouteCard";
import Button from "../Button/Button";
import "./BusRoute.scss";
import axiosInstance from "../../utils/service";
import { Link } from "react-router-dom";


const BusRoute = ({
  locationOne,
  locationTwo,
  departureDate,
  returnDate,
  onSearch,
}) => {
  const [locationOneSuggestions, setLocationOneSuggestions] = useState([]);
  const [locationTwoSuggestions, setLocationTwoSuggestions] = useState([]);
  const [sourceCity, setSourceCity] = useState(locationOne);
  const [destinationCity, setDestinationCity] = useState(locationTwo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSourceCity(locationOne);
    setDestinationCity(locationTwo);
  }, [locationOne, locationTwo]);

  const fetchLocationSuggestions = async (query, setLocationSuggestions) => {
    try {
      setLoading(true);
      // if (query.length > 3) {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/api/busBooking/searchCity/${query}`
      );
      setLocationSuggestions(response.data.data);
      setLoading(false);
      // } else {
      //   setLocationSuggestions([]);
      // }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  const [locationOneQuery, setLocationOneQuery] = useState("");
  const [locationTwoQuery, setLocationTwoQuery] = useState("");

  useEffect(() => {
    let debounceTimer;

    const handleQueryChange = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (locationOneQuery) {
          fetchLocationSuggestions(locationOneQuery, setLocationOneSuggestions);
        }
        if (locationTwoQuery) {
          fetchLocationSuggestions(locationTwoQuery, setLocationTwoSuggestions);
        }
      }, 500);
    };

    handleQueryChange();

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [locationOneQuery, locationTwoQuery]);

  return (
    <>
    <div className="BusRoute">
      <BusRouteCard
        title="From"
        location={sourceCity}
        setLocation={(value) => onSearch(value, locationTwo, departureDate)}
        suggestions={locationOneSuggestions}
        loading={loading}
        setLocationQuery={setLocationOneQuery}
        />
      <img
        src={twowayarrow}
        alt="reverse routes"
        className="reverse-img"
        onClick={({ target: image }) => {
          const currentRotation =
          getComputedStyle(image).getPropertyValue("transform");
          
          if (currentRotation === "none") {
            image.style.transform = "rotate(180deg)";
          } else {
            image.style.transform = "";
          }
          setDestinationCity(locationOne);
          setSourceCity(locationTwo);
          console.log(sourceCity);
          onSearch(locationTwo, locationOne, departureDate);
        }}
        />
      <BusRouteCard
        title="To"
        location={destinationCity}
        setLocation={(value) => onSearch(locationOne, value, departureDate)}
        suggestions={locationTwoSuggestions}
        loading={loading}
        setLocationQuery={setLocationTwoQuery}
        />
      <BusRouteCard
        title="Select Date"
        location={departureDate}
        setLocation={(value) => onSearch(locationOne, locationTwo, value)}
        date={true}
        />
      <Button
        text={"Search"}
        onClicked={() => onSearch(locationOne, locationTwo, departureDate)}
        />
    </div>
    <div className="MobileBusRoute" >
<h4>PROVIDING QUALITY SERVICES AT </h4>
<h4 className="AFFORDABLE">AFFORDABLE PRICES</h4>
<div className="select_vehicle">
<button className="btn1">   <Link
                  to={
                  "/busbooking"
                  }
                  className="link"
                >Bus</Link></button>
<button className="btn2"><Link
                  to={
                   "/cabs"
                  }
                  className="link"

                >Cab</Link></button>
</div>
<div>
  <h4>Bus Ticket</h4>
  <div className="outer_border">
<div className="inputs">
  <div className="fromto">
  <BusRouteCard
        title="From"
        location={sourceCity}
        setLocation={(value) => onSearch(value, locationTwo, departureDate)}
        suggestions={locationOneSuggestions}
        loading={loading}
        setLocationQuery={setLocationOneQuery}
        style={{ borderTop: 'none', backgroundColor: 'transparent', paddingLeft:"10px", paddingTop:"0px",paddingBottom:"0px", paddingRight:"0px",maxWidth:"100%" }}
        color={{color:"black"}}

        />
        <div className="img_rotater">
          <img
        src={twowayarrow}
        alt="reverse routes"
        className="reverse-img"
        width={23}
        onClick={({ target: image }) => {
          const currentRotation =
          getComputedStyle(image).getPropertyValue("transform");
          
          if (currentRotation === "none") {
            image.style.transform = "rotate(180deg)";
          } else {
            image.style.transform = "";
          }
          setDestinationCity(locationOne);
          setSourceCity(locationTwo);
          console.log(sourceCity);
          onSearch(locationTwo, locationOne, departureDate);
        }}
        />

        <hr />
        </div>
          <BusRouteCard
        title="To"
        location={destinationCity}
        setLocation={(value) => onSearch(locationOne, value, departureDate)}
        suggestions={locationTwoSuggestions}
        loading={loading}
        setLocationQuery={setLocationTwoQuery}
        style={{ borderTop: 'none', backgroundColor: 'transparent', paddingLeft:"10px", paddingTop:"0px",paddingBottom:"0px" , paddingRight:"0px",maxWidth:"100%" }}
        color={{color:"black"}}

        />
  </div>
  <BusRouteCard
        title="Select Date"
        location={departureDate}
        setLocation={(value) => onSearch(locationOne, locationTwo, value)}
        date={true}
        style={{ borderTop: 'none', backgroundColor: 'transparent', paddingLeft:"10px", paddingTop:"0px",paddingBottom:"0px" , paddingRight:"5px",maxWidth:"100%" }}
        color={{color:"black"}}
        />
  {/* <div className="days">
<button className="btn1">Today</button>
<button className="btn2">Tomorrow</button>
  </div> */}
</div>
  </div>
</div>
<Button
        text={"Search"}
        onClicked={() => onSearch(locationOne, locationTwo, departureDate)}
        style={{width:"100%", marginTop:"5px"}}
        />
    </div>
        </>
  );
};

export default BusRoute;
