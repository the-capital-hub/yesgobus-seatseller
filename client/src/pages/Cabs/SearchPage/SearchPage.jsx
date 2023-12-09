import "./SearchPage.scss";
import { Flex, Divider } from "antd";
import { IoArrowBack } from "react-icons/io5";
import BookingLocation from "../../../components/Cabs/BookingLocation/BookingLocation";
import placeholder from "../../../assets/cabs/placeholder";

export default function SearchPage() {
  return (
    <div className="search-page-wrapper">
      <button
        type="button"
        className="btn-base"
        style={{ marginBottom: "2rem" }}
      >
        <IoArrowBack size={24} /> Pick-up
      </button>

      <div className="booking-location-container">
        <div className="" style={{ padding: "0 1rem" }}>
          <BookingLocation />
        </div>
        <img src={placeholder.map} alt="Map" className="map-image" />
      </div>

      <div className="favorites-container">
        <h3>Favorites</h3>
      </div>
    </div>
  );
}
