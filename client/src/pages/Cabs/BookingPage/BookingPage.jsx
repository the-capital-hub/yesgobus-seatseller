import React from "react";
import "./BookingPage.scss";
import { Card } from "antd";
import placeholder from "../../../assets/cabs/placeholder/index";
import RideDetailsCard from "../../../components/Cabs/RideDetailsCard/RideDetailsCard";
import { FaRupeeSign, FaChevronRight } from "react-icons/fa";
import BookingLocation from "../../../components/Cabs/BookingLocation/BookingLocation";
import { FaArrowLeft } from "react-icons/fa6";
import car from "../../../assets/cabs/rideTypes/index";

function BookingPage() {
  return (
    <section className="book_any_cab_page">
      <div className="map">
        <img src={placeholder.map} alt="map" />
        <div className="back_btn">
          <FaArrowLeft />
        </div>
        <BookingLocation />
      </div>
      <div className="place"></div>
      <div className="recommended">
        <h4>Recommended for you</h4>
        <div className="recommended_Cab">
          <Card>
            <RideDetailsCard
              image={car.car1}
              title={"Book Any"}
              secondTitle={"Mini, Prime Sedan"}
              price={222}
            />
            <hr />
            <div className="Donate_program">
              <FaRupeeSign color="white" className="rs" />
              <h4>Donate Rs 1 towards Saheli Program</h4>
              <FaChevronRight />
            </div>
          </Card>
          <Card>
            <RideDetailsCard
              image={car.car2}
              title={"Prime Sedan"}
              secondTitle={"Spacious sedans, top drivers"}
              price={222}
            />
          </Card>
          <Card>
            <RideDetailsCard
              image={car.byke}
              title={"eBike"}
              secondTitle={"Zip through traffic on a yesgobus eBike."}
              price={222}
            />
          </Card>
        </div>
      </div>
      <div className="book_button">

      <button>Book Any</button>
      </div>
    </section>
  );
}

export default BookingPage;
