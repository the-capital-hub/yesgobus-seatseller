import { ConfigProvider, Table, Spin, Space, Popover } from "antd";
import NotificationIcon from "../../../components/SvgIcons/NotificationIcon";
import UserIcon from "../../../components/SvgIcons/UserIcon";
import "./AdminRecords.scss";
import { useState, useEffect } from "react";
import { getAgentBookings } from "../../../api/admin";
import { ADMIN_KEY } from "../AdminLogin/AdminLogin";

const columns = [
  {
    title: "Name",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "Time of Booking",
    dataIndex: "doj",
    key: "doj",
  },
  {
    title: "Operator",
    dataIndex: "busOperator",
    key: "busOperator",
  },
  {
    title: "From",
    dataIndex: "sourceCity",
    key: "sourceCity",
  },
  {
    title: "To",
    dataIndex: "destinationCity",
    key: "destinationCity",
  },
  {
    title: "Cost (Rs)",
    dataIndex: "totalAmount",
    key: "totalAmount",
    sorter: (a, b) => a.totalAmount - b.totalAmount,
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <Popover content={content(record)} title="Details" trigger="click">
          <a>View</a>
        </Popover>
      </Space>
    ),
  },
];

const content = (data) => {
  const bookingTime = new Date(data?.createdAt);

  return (
    <div className="px-4">
      <p className="font-semibold">Date and Time Of Booking</p>
      <p>{bookingTime?.toLocaleString([], {})}</p>
    </div>
  );
};

const tableStyles = {
  boxShadow: "4px 4px 30px 0px #00000026",
  borderRadius: "10px",
  border: "1px solid #53535342",
  overflow: "hidden",
};

export default function AdminRecords() {
  const loggedInAdmin = JSON.parse(
    localStorage.getItem(`${ADMIN_KEY}-loggedInAdmin`)
  );

  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    const getAllAgentBookings = async () => {
      try {
        const response = await getAgentBookings(loggedInAdmin._id);
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
    getAllAgentBookings();
  }, [loggedInAdmin._id]);

  return (
    <div className="admin-records-wrapper">
      <div className="bg-white rounded-lg border border-solid border-gray-300 flex flex-col gap-4 p-3 lg:px-8 lg:py-8">
        {/* Icons */}
        <div className="icons self-end flex justify-center items-center gap-4 xl:gap-8">
          <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <UserIcon />
          </div>
          <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <NotificationIcon />
          </div>
        </div>
        {/* Table */}
        <div className="flex flex-col gap-4">
          <h2 className="m-0">Records</h2>
          <ConfigProvider
            theme={{
              token: {},
              components: {
                Table: {
                  borderColor: "#53535342",
                  rowHoverBg: "#fd590122",
                },
              },
            }}
          >
            <Table
              dataSource={bookings}
              columns={columns}
              scroll={{ x: true }}
              style={tableStyles}
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
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}
