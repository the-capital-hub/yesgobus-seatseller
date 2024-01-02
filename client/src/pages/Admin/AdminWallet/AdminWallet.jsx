import { Card, Space, Table, Spin } from "antd";
import HeaderWithSort from "../../../components/Admin/HeaderWithSort/HeaderWithSort";
import WalletCard from "../../../components/Admin/WalletCard/WalletCard";
import "./AdminWallet.scss";
// import { HiArrowSmUp, HiArrowSmDown } from "react-icons/hi";
import { useState, useEffect } from "react";
import {
  getBalanceAPI,
  getAllBookings,
  getAllBookingRefund,
} from "../../../api/admin";
import TransactionArrow from "../../../components/Admin/TransactionArrow/TransactionArrow";

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
    title: "Date & Time",
    dataIndex: "doj",
    key: "doj",
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
        <a>View</a>
      </Space>
    ),
  },
];

const AdminWallet = () => {
  const [balance, setBalance] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [refunds, setRefunds] = useState(null);

  const getBalance = async () => {
    try {
      const response = await getBalanceAPI();
      setBalance(response);
    } catch (error) {
      console.error("Error :", error);
    }
  };

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

  const getBookingRefundDetails = async () => {
    try {
      const response = await getAllBookingRefund();
      const bookingsData = response.data.map((booking) => {
        booking.doj = new Date(booking.doj).toISOString().split("T")[0];
        booking.customerName =
          booking.customerName + " " + (booking.customerLastName || "");
        return booking;
      });
      setRefunds(bookingsData);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    getBalance();
    getAllBookingDetails();
    getBookingRefundDetails();
  }, []);

  return (
    <div className="admin-wallet-wrapper">
      <HeaderWithSort />
      <h2 className="m-0">Wallet</h2>
      {/* Wallet Cards */}
      <div className="wallet-cards flex flex-col md:flex-row gap-3 items-center md:items-stretch flex-wrap">
        <WalletCard
          color="#fd5901"
          name={"VRL Wallet"}
          balance={balance?.vrl}
        />
        <WalletCard
          color="#3f3f3f"
          name={"Bitlasoft Wallet"}
          balance={balance?.ticketSimply}
        />
        <Card className="border border-solid border-gray-300 shadow-lg">
          <div className="w-48 flex justify-around items-center">
            <div className="flex flex-col gap-4 items-center">
              {/* <HiArrowSmUp
                size={40}
                color="#fd5901"
                className="rounded-full p-3 bg-gray-200"
              /> */}

              <TransactionArrow size="large" />

              <h4 className="m-0">Sales</h4>
            </div>
            <div className="flex flex-col gap-4 items-center">
              {/* <HiArrowSmDown
                size={40}
                className="rounded-full p-3 bg-gray-200"
              /> */}
              <TransactionArrow
                rotateClass="rotate-180"
                colorClass="text-black"
                size="large"
              />
              <h4 className="m-0">Refund</h4>
            </div>
          </div>
        </Card>
      </div>
      {/* History Refunded */}
      <section className="history-wrapper flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="m-0 flex gap-2">
            History
            {/* <span className="flex items-center">
              <HiArrowSmDown /> Refunded
            </span> */}
          </h2>
          <div className="flex items-center gap-2">
            <TransactionArrow
              rotateClass="rotate-[210deg]"
              colorClass="text-black"
            />
            <p className="m-0 text-2xl font-semibold">Refunded</p>
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
        />
      </section>
      {/* History Sales*/}
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
          dataSource={refunds}
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
            spinning: !refunds || !refunds.length === 0,
          }}
        />
      </section>
    </div>
  );
};

export default AdminWallet;
