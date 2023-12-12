import "./SearchPage.scss";
import { IoArrowBack } from "react-icons/io5";
import BookingLocation from "../../../components/Cabs/BookingLocation/BookingLocation";
import placeholder from "../../../assets/cabs/placeholder";
import ShortLocationCard from "../../../components/cabs/ShortLocationCard/ShortLocationCard";
import { useNavigate } from "react-router-dom";

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

export default function SearchPage() {
  const navigate = useNavigate();

  const handleLocation = () => navigate("/cabs/booking");

  return (
    <div className="search-page-wrapper">
      <button
        type="button"
        className="btn-base"
        onClick={() => navigate("/cabs")}
      >
        <IoArrowBack size={24} /> Pick-up
      </button>

      <div className="booking-location-container">
        <div className="" style={{ padding: "0 1rem", maxHeight: "60px" }}>
          <BookingLocation />
        </div>
        <img src={placeholder.map} alt="Map" className="map-image" />
      </div>

      <div className="favorites-container">
        <h3>Favorites</h3>
        {prevLocations?.map((singleLocation) => (
          <ShortLocationCard {...singleLocation} onClick={handleLocation} />
        ))}
      </div>
    </div>
  );
}
