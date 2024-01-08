import { Popover, Space, Spin, Table } from "antd";
import TransactionArrow from "../../../../../components/Admin/TransactionArrow/TransactionArrow";
import { useEffect, useState } from "react";
import { getAllBookings } from "../../../../../api/admin";
import { formatBusTravelTime } from "../../../../../utils/Admin/AdminHelpers";

const columns = [
  {
    title: "Name",
    dataIndex: "customerName",
    key: "customerName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Source City",
    dataIndex: "sourceCity",
    key: "sourceCity",
  },
  {
    title: "Destination City",
    dataIndex: "destinationCity",
    key: "destinationCity",
  },
  {
    title: "Date of Journey",
    dataIndex: "doj",
    key: "doj",
  },
  {
    title: "Departure",
    key: "pickUpTime",
    render: (_, record) => {
      return formatBusTravelTime(record);
    },
  },
  {
    title: "Operator",
    dataIndex: "busOperator",
    key: "busOperator",
  },
  {
    title: "Amount",
    dataIndex: "totalAmount",
    key: "totalAmount",
    sorter: (a, b) => a.totalAmount - b.totalAmount,
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <Popover
          content={<Content record={record} />}
          title="Details"
          trigger="click"
        >
          <a>View</a>
        </Popover>
      </Space>
    ),
  },
];

const Content = ({ record }) => {
  const bookingTime = new Date(record?.createdAt);

  return (
    <div className="px-4">
      <p className="font-semibold">Date and Time Of Booking</p>
      <p>{bookingTime?.toLocaleString([], {})}</p>
    </div>
  );
};

export default function WalletSales() {
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    const getAllBookingDetails = async () => {
      try {
        const response = await getAllBookings();
        const bookingsData = response.data.map((booking) => {
          booking.doj = new Date(booking.doj).toISOString().split("T")[0];
          booking.customerName =
            booking.customerName + " " + (booking.customerLastName || "");
          return booking;
        });
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error :", error);
      }
    };

    getAllBookingDetails();
  }, []);

  return (
    <section className="history-wrapper flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="m-0 flex gap-2">
          History
          {/* <span className="flex items-center">
        <HiArrowSmUp color="#fd5901" /> Sales
      </span> */}
        </h2>
        <div className="flex items-center gap-2">
          <TransactionArrow rotateClass="rotate-[30deg]" />
          <p className="m-0 text-2xl font-semibold">Sales</p>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={bookings}
        className="box-container"
        pagination={{
          pageSize: 5,
          hideOnSinglePage: true,
        }}
        loading={{
          indicator: (
            <div>
              <Spin />
            </div>
          ),
          spinning: !bookings || !bookings.length === 0,
        }}
        rowKey={(record) => record._id}
      />
    </section>
  );
}
