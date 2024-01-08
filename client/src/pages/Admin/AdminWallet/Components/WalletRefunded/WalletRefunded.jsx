import { Space, Spin, Table } from "antd";
import TransactionArrow from "../../../../../components/Admin/TransactionArrow/TransactionArrow";
import { useEffect, useState } from "react";
import { getAllBookingRefund } from "../../../../../api/admin";

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
    render: () => (
      <Space size="middle">
        <a>View</a>
      </Space>
    ),
  },
];

export default function WalletRefunded() {
  const [refunds, setRefunds] = useState(null);

  useEffect(() => {
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

    getBookingRefundDetails();
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
        rowKey={(refunds) => refunds._id}
      />
    </section>
  );
}
