import React from "react";

import "./AdminTrackAgent.scss";
import HeaderWithSort from "../../../components/Admin/HeaderWithSort/HeaderWithSort";
import { Table } from "antd";
function AdminTrackAgent() {
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
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render: () => "Karthik",
    },
  ];

  const data = Array(4).fill({});

  return (
    <div className="track-agent-wrapper bg-white lg:rounded-xl my-4 mx-8 border border-solid border-gray-300">
      <HeaderWithSort />

      <div className="trackAgent-container flex flex-col gap-5 py-5">
        <h2 className="m-0">Track Agent</h2>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          bordered={false}
          footer={() => ""}
          className="w-full rounded-lg border border-solid border-gray-300 bg-white shadow-xl"
        />
      </div>
    </div>
  );
}

export default AdminTrackAgent;
