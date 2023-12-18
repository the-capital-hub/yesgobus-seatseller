import './LandingPage.scss';
import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import { GrMenu } from 'react-icons/gr';
import { IoSearch } from 'react-icons/io5';
import GoogleMapReact from 'google-map-react';
import { useNavigate } from 'react-router-dom';
import Drawer from './Components/Drawer/Drawer.jsx';
import ShortLocationCard from '../../../components/cabs/ShortLocationCard/ShortLocationCard.jsx';
import Pin from "../../../assets/cabs/placeholder/pinicon.svg";

const defaultProps = {
  zoom: 11,
};

const prevLocations = [
  {
    title: 'Home',
    location: '2A CROSS, Tech City Layout Celebrity Paradise layout',
  },
  { title: 'Office', location: 'XYZ compound, ABC Street, J Town - 676784' },
  {
    title: 'Favorite Restaurant',
    location: 'ABC Restaurant, Main Street, City - 123456',
  },
  { title: 'Gym', location: 'Fitness Center, Fitness Street, Town - 987654' },
  {
    title: "Friend's House",
    location: "Friend's Home, Friendship Avenue, Village - 567890",
  },
  { title: 'Local Park', location: 'City Park, Greenery Lane, Town - 112233' },
  {
    title: 'Library',
    location: 'Public Library, Knowledge Street, City - 445566',
  },
];

function LandingPage() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [location, setLocation] = useState(null);
  const [showLocation, setShowLocation] = useState(null);
  const navigate = useNavigate();

  const handleDestination = () => navigate('/cabs/search');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setSearchedLocation({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    });
  }, []);

  const handleSearch = async (value) => {
    try {

      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${value}&apiKey=${import.meta.env.VITE_GEOAPIFY_API}`
      )
      const data = await response.json();
      console.log(data);
      const lat = data.features[0].properties.lat;
      const lng = data.features[0].properties.lon;
      console.log(lat, lng);
      setSearchedLocation({
        center: {
          lat: lat,
          lng: lng,
        },
      });
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <>
      <div className="cab-landing-page">
        <section className="map">
          <header style={{ zIndex: '9999' }}>
            <Input
              size="large"
              placeholder="Your current location"
              prefix={<GrMenu size={20} onClick={() => setShowDrawer(true)} />}
              suffix={
                <Button type="primary" onClick={() => handleSearch(location)}>
                  {">"}
                </Button>
              }
              className="your-location-input"
              onChange={(e) => setLocation(e.target.value)}
              onPressEnter={() => handleSearch(value)}
            />
          </header>
          <div
            style={{
              height: '60vh',
              width: '100vw',
              objectFit: 'cover',
              position: 'relative',
              zIndex: '1',
            }}
          >
            {searchedLocation && (
              <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_KEY }}
                defaultCenter={searchedLocation?.center}
                defaultZoom={searchedLocation ? 15 : defaultProps.zoom}
                center={searchedLocation?.center}
              >
                {searchedLocation && (
                  <Marker
                    lat={searchedLocation?.center.lat}
                    lng={searchedLocation?.center.lng}
                    text={showLocation}
                  />
                )}
              </GoogleMapReact>
            )}
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
                key={singleLocation.title}
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

const Marker = ({ text }) => (
  <div className="map-marker">
    <img src={Pin} alt="Pin" style={{ width: '32px', height: '32px' }} />
    <div className="pin-text">{text}</div>
  </div>
);

export default LandingPage;
