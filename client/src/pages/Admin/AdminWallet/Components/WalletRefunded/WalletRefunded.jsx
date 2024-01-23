import { Popover, Space, Spin, Table, Button } from "antd";
import TransactionArrow from "../../../../../components/Admin/TransactionArrow/TransactionArrow";
import { useEffect, useState } from "react";
import { getAllBookingRefund } from "../../../../../api/admin";
import { formatBusTravelTime } from "../../../../../utils/Admin/AdminHelpers";
import { CSVLink } from "react-csv";
import { DownloadOutlined } from "@ant-design/icons";
import { useOutletContext } from "react-router-dom";

const columns = [
  {
    title: "Name",
    label: "Name",
    dataIndex: "customerName",
    key: "customerName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Source City",
    label: "Source City",
    dataIndex: "sourceCity",
    key: "sourceCity",
  },
  {
    title: "Destination City",
    label: "Destination City",
    dataIndex: "destinationCity",
    key: "destinationCity",
  },
  {
    title: "Date of Journey",
    label: "Date of Journey",
    dataIndex: "doj",
    key: "doj",
  },
  {
    title: "Departure",
    label: "Departure",
    key: "pickUpTime",
    render: (_, record) => {
      return formatBusTravelTime(record);
    },
  },
  {
    title: "Operator",
    label: "Operator",
    dataIndex: "busOperator",
    key: "busOperator",
  },
  {
    title: "Amount",
    label: "Amount",
    dataIndex: "totalAmount",
    key: "totalAmount",
    sorter: (a, b) => a.totalAmount - b.totalAmount,
    render: (_, record) => {
      let amount = Number.parseFloat(+record.totalAmount).toFixed(2);
      return <p>{amount}</p>;
    },
  },
  {
    title: "Booked By BDA",
    label: "Bookend By BDA",
    dataIndex: "bookedByAgent",
    key: "bookedByAgent",
    sorter: (a, b) => a.bookedByAgent.localeCompare(b.bookedByAgent),
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
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
        >
          <a>View</a>
        </Popover>
      </Space>
    ),
  },
];

const Content = ({ record }) => {
  const refundTime = new Date(record?.updatedAt);

  return (
    <div className="px-4">
      <p className="font-semibold">Date and Time Of Refund</p>
      <p className="uppercase">
        {new Intl.DateTimeFormat("en-IN", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(refundTime)}
      </p>
    </div>
  );
};

export default function WalletRefunded() {
  const [refunds, setRefunds] = useState(null);
  const { admin } = useOutletContext();


  useEffect(() => {
    const getBookingRefundDetails = async (agentId) => {
      try {
        const response = await getAllBookingRefund(agentId);
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

    getBookingRefundDetails(admin._id);
  }, []);

  return (
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
      {refunds?.length > 0 && (
        <div className="flex flex-end pb-2 flex-container">
          <Button type="primary" icon={<DownloadOutlined />}>
            <CSVLink data={refunds} headers={columns} filename={"Refunds.csv"}>
              Export to CSV
            </CSVLink>
          </Button>
        </div>
      )}
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
        rowKey={(record) => record._id}
        scroll={{ x: true }}
      />
    </section>
  );
}
