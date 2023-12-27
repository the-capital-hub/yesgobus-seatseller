import { RiSearch2Line } from "react-icons/ri";
import "./DashboardHeader.scss";
import UserIcon from "../../../../../components/SvgIcons/UserIcon";
import NotificationIcon from "../../../../../components/SvgIcons/NotificationIcon";
import { Card } from "antd";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <div
          className="flex items-center gap-4 bg-white border border-solid border-gray-200 shadow-md rounded-lg p-4"
          style={{ maxWidth: 450, width: "100%" }}
        >
          <RiSearch2Line size={30} />
          <input
            type="search"
            name="search"
            id="search"
            className="border-0 outline-none bg-transparent w-full text-lg"
            placeholder="Search ..."
          />
        </div>
        <div className="icons flex items-center gap-8">
          <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <UserIcon />
          </div>
          <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <NotificationIcon />
          </div>
        </div>
      </div>

      {/* Heading */}
      <h2 className="m-0">Dashboard</h2>

      {/* Cards */}
      <div className="cards-container flex flex-col items-center gap-5 rounded-lg bg-white p-3 border border-solid border-gray-300 shadow-md md:flex-row md:p-5">
        {["#3f3f3f", "#fd5901"].map((color, index) => {
          return (
            <Card
              hoverable
              style={{
                borderRadius: "1rem",
                width: "19rem",
                backgroundColor: `${color}`,
                color: "#fff",
              }}
              key={`${color}-${index}`}
            >
              <p className="m-0 text-base">Name</p>
              <p className="m-0 text-lg">Full Name</p>
              <p className="m-0 text-base">
                {Array(3)
                  .fill(0)
                  .map((elem, index) => {
                    return (
                      <span
                        style={{ letterSpacing: "0.5ch" }}
                        className="me-5"
                        key={index}
                      >
                        &#8226;&#8226;&#8226;&#8226;
                      </span>
                    );
                  })}
                <span>1234</span>
              </p>
              <p className="m-0 text-base">Balance</p>
              <p className="m-0 text-base">Rs. 1,00,000</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
