import React from "react";
import "./BookingPage.scss";
import { Card } from "antd";
import assets from "../../../assets/cabs/placeholder/index";
import RideDetailsCard from "../../../components/Cabs/RideDetailsCard/RideDetailsCard";
function BookingPage() {
  return (
    <section className="book_any_cab_page">
      <div className="map">
        <img src={assets.map} alt="map" />
      </div>
      <div className="place"></div>
      <div className="recommended">
        <h4>Recommended for you</h4>
        <div className="recommended_Cab">
          <Card>
            <div>
            <RideDetailsCard 
            image={"https://imgd.aeplcdn.com/664x374/n/cw/ec/30181/phantom-exterior-right-front-three-quarter.jpeg?isig=0&q=80"}
            title={"Book Any"}
            secondTitle={"Mini, Prime Sedan"}
            price={222}
            />
            </div>
            <hr />
          </Card>
        </div>
      </div>
    </section>
  );
}

export default BookingPage;
