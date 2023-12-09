import "./SearchPage.scss";
import { Flex, Divider } from "antd";
import { IoArrowBack } from "react-icons/io5";
import BookingLocation from "../../../components/Cabs/BookingLocation/BookingLocation";

export default function SearchPage() {
  return (
    <div className="search-page-wrapper">
      <button type="button" className="btn-base">
        <IoArrowBack size={24} /> Pick-up
      </button>

      <div className="booking-location-container" style={{ padding: "0 1rem" }}>
        <BookingLocation />
      </div>
    </div>
  );
}
