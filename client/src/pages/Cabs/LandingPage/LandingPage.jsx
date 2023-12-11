import "./LandingPage.scss";
import placeholder from "../../../assets/cabs/placeholder";
import { Input } from "antd";
import { GrMenu } from "react-icons/gr";
import { useState } from "react";
import Drawer from "./Components/Drawer/Drawer.jsx";
import { IoSearch } from "react-icons/io5";
import ShortLocationCard from "../../../components/cabs/ShortLocationCard/ShortLocationCard.jsx";
import { useNavigate } from "react-router-dom";
import GoogleMapReact from 'google-map-react'


const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627
  },
  zoom: 11
};

const prevLocations = [
  {
    title: "Home",
    location: "2A CROSS, Tech City Layout Celebrity Paradise layout",
  },
  { title: "Office", location: "XYZ compound, ABC Street, J Town - 676784" },
  {
    title: "Favorite Restaurant",
    location: "ABC Restaurant, Main Street, City - 123456",
  },
  { title: "Gym", location: "Fitness Center, Fitness Street, Town - 987654" },
  {
    title: "Friend's House",
    location: "Friend's Home, Friendship Avenue, Village - 567890",
  },
  { title: "Local Park", location: "City Park, Greenery Lane, Town - 112233" },
  {
    title: "Library",
    location: "Public Library, Knowledge Street, City - 445566",
  },
];

function LandingPage() {
  const [showDrawer, setShowDrawer] = useState(false);

  const navigate = useNavigate();

  const handleDestination = () => navigate("/cabs/search");

  return (
    <>
      <div className="cab-landing-page">
        <section className="map">
          <header>
          </header>
          <div style={{ height: '60vh', width: '100vw', objectFit: "cover", position: "relative" }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_KEY }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <Input
                size="large"
                placeholder="Your current location"
                prefix={<GrMenu size={20} onClick={() => setShowDrawer(true)} />}
                className="your-location-input inside-map-input"
              />
            </GoogleMapReact>
          </div>
        </section>
        <section className="content">
          <Input
            size="large"
            onClick={handleDestination}
            placeholder="Search destination"
            prefix={<IoSearch size={25} />}
            className="destination-input"
          />
          <div className="previous-destinations">
            <h4>Recent Destinations</h4>
            {prevLocations?.map((singleLocation) => (
              <ShortLocationCard
                {...singleLocation}
                onClick={handleDestination}
              />
            ))}
          </div>
        </section>
      </div>
      <Drawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
    </>
  );
}
export default LandingPage;
