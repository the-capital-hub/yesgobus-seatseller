import { Button } from "antd";
import { Link } from "react-router-dom";
import { WatermarkIcon } from "../../../../../assets/contact";

export default function TrackAgentList() {
  return (
    <div className="list-container flex flex-col rounded-lg border border-solid border-gray-300 bg-white shadow-lg">
      <header className="list-bar grid grid-cols-4 place-items-center py-4 px-8">
        <p className="m-0 text-lg justify-self-start">Bus Route</p>
        <p className="m-0 text-lg">Bus Number</p>
        <p className="m-0 text-lg">Buses</p>
        <p className="m-0 text-lg justify-self-end w-[150px] text-center">
          Track
        </p>
      </header>
      {Array.from({ length: 5 }).map((elem, index) => {
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
            <Link className="no-underline text-inherit justify-self-end w-[150px]">
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
      <footer className="list-bar grid grid-cols-4 place-items-center py-7 px-8"></footer>
    </div>
  );
}
