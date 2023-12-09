import "./BookingLocation.scss";
import { FaCircle } from "react-icons/fa";
import { Flex, AutoComplete, Divider } from "antd";

export default function BookingLocation() {
  return (
    <div className="location-container" id="bookingLocation">
      <Flex>
        <div className="location-pins">
          <FaCircle color="#008000" />
          <Divider
            style={{
              backgroundColor: "#000",
              width: "1px",
              flex: "1 1 0",
              marginBlock: "0.5rem",
            }}
            type="vertical"
          />
          <FaCircle color="#FF0000" />
        </div>

        <Flex vertical flex={"1 1 0"}>
          <div className="">
            <AutoComplete
              placeholder="Your Current Location"
              options={[]}
              filterOption={true}
              bordered={false}
              style={{ width: "100%" }}
            />
          </div>
          <Divider style={{ backgroundColor: "#000", marginBlock: "0.5rem" }} />
          <div className="">
            <AutoComplete
              placeholder="Enter Destination"
              options={[]}
              filterOption={true}
              bordered={false}
              style={{ width: "100%" }}
            />
          </div>
        </Flex>
      </Flex>
    </div>
  );
}
