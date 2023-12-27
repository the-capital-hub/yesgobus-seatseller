import "./AdminDashboard.scss";
import DashboardHeader from "./Components/DashboardHeader/DashboardHeader";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { WatermarkIcon } from "../../../assets/contact";

export default function AdminDashboard() {
  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <DashboardHeader />

        <div className="shortBoard border border-solid border-gray-300">
          Side
        </div>
      </header>

      {/* Track Agent */}
      <div className="trackAgent-container flex flex-col gap-5 py-5">
        <h2 className="m-0">Track Agent</h2>

        <div className="list-container flex flex-col rounded-lg border border-solid border-gray-300 bg-white">
          <header className="list-bar grid grid-cols-4 place-items-center py-4 px-8">
            <p className="m-0 text-lg justify-self-start">Bus Route</p>
            <p className="m-0 text-lg">Bus Number</p>
            <p className="m-0 text-lg">Buses</p>
            <p className="m-0 text-lg justify-self-end">Track</p>
          </header>
          {Array(4)
            .fill(0)
            .map((elem, index) => {
              return (
                <div
                  className="list-bar grid grid-cols-4 place-items-center py-4 px-8"
                  key={`${elem}-${index}`}
                >
                  <div className="flex items-center gap-4 justify-self-start">
                    <img
                      src={WatermarkIcon}
                      alt="route"
                      width={50}
                      height={50}
                      className="object-contain rounded-full border border-solid border-gray-300"
                    />
                    <p className="m-0">Bangalore to Mysore</p>
                  </div>
                  <p className="m-0">Bus Number</p>
                  <p className="m-0">No. of Buses</p>
                  <Link className="no-underline text-inherit  justify-self-end">
                    <Button
                      htmlType="button"
                      type="primary"
                      shape="round"
                      size="large"
                      style={{ paddingInline: "3.5rem" }}
                    >
                      Track
                    </Button>
                  </Link>
                </div>
              );
            })}
          <footer className="list-bar grid grid-cols-4 place-items-center py-8 px-8"></footer>
        </div>
      </div>
    </div>
  );
}
