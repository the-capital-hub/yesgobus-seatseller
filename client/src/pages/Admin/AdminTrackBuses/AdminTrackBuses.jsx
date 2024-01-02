import React from "react";
import "./AdminTrackBuses.scss";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import HeaderWithSort from "../../../components/Admin/HeaderWithSort/HeaderWithSort";

function AdminTrackBuses() {
  const columns = [
    {
      title: "No. of Buses",
      dataIndex: "noOfBuses",
      key: "noOfBuses",
      render: (text, record, index) => `${index + 1}.KA 0Z 4488`,
    },
    {
      title: "Location Booked",
      dataIndex: "locationBooked",
      key: "locationBooked",
      render: () => "Bangalore to Mysore",
    },
    {
      title: "Starting Timings",
      dataIndex: "startingTimings",
      key: "startingTimings",
      render: () => "10:00am",
    },
    {
      title: "Reached Timings",
      dataIndex: "reachedTimings",
      key: "reachedTimings",
      render: () => "10:00pm",
    },
    {
      title: "Track",
      dataIndex: "track",
      key: "track",
      render: () => (
        <Button
          htmlType="button"
          shape="round"
          size="large"
          style={{
            paddingInline: "3.5rem",
            background: "#FF0000",
            color: "white",
          }}
        >
          Track
        </Button>
      ),
    },
  ];

  const data = Array(4).fill({});

  return (
    <div className="track-buses-wrapper bg-white lg:rounded-xl my-4 lg:mx-8 border border-solid border-gray-300">
      <HeaderWithSort />
      <div className="trackAgent-container flex flex-col gap-5 py-5">
        <h2 className="m-0">Tracking All Buses Booked</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            bordered={false}
            footer={() => ""}
            className="w-full rounded-lg border border-solid border-gray-300 bg-white shadow-xl overflow-x-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminTrackBuses;
