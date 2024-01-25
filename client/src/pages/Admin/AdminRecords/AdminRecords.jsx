import { ConfigProvider, Table, Spin, Space, Popover } from "antd";
// import NotificationIcon from "../../../components/SvgIcons/NotificationIcon";
// import UserIcon from "../../../components/SvgIcons/UserIcon";
import "./AdminRecords.scss";
import { useState, useEffect, useCallback } from "react";
import { getAgentBookings } from "../../../api/admin";
// import { ADMIN_KEY } from "../AdminLogin/AdminLogin";
import { formatBusTravelTime } from "../../../utils/Admin/AdminHelpers";
import { Navigate, useOutletContext } from "react-router-dom";
import FiltersAndExport from "../../../components/Admin/FiltersAndExport/FiltersAndExport";

const columns = [
  {
    title: "Name",
    label: "Name",
    dataIndex: "customerName",
    key: "customerName",
  },

  {
    title: "Operator",
    label: "Operator",
    dataIndex: "busOperator",
    key: "busOperator",
  },
  {
    title: "From",
    label: "From",
    dataIndex: "sourceCity",
    key: "sourceCity",
  },
  {
    title: "To",
    label: "To",
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
    title: "Cost (Rs)",
    label: "Cost (Rs)",
    dataIndex: "totalAmount",
    key: "totalAmount",
    sorter: (a, b) => a.totalAmount - b.totalAmount,
    render: (_, record) => {
      let amount = Number.parseFloat(+record.totalAmount).toFixed(2);
      return <p>{amount}</p>;
    },
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
      <p className="uppercase">
        {new Intl.DateTimeFormat("en-IN", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(bookingTime)}
      </p>
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
  const { admin } = useOutletContext();

  // Local states
  const [bookings, setBookings] = useState(null);
  const [dateFilters, setDateFilters] = useState({
    fromDate: null,
    toDate: null,
  });
  const [loading, setLoading] = useState(false);

  // Fetch function
  const getAllAgentBookings = useCallback(
    async (params) => {
      console.log("called");
      try {
        const response = await getAgentBookings(admin._id, params);
        const bookingsData = response.data.map((booking) => {
          booking.doj = new Date(booking.doj).toISOString().split("T")[0];
          booking.customerName =
            booking.customerName + " " + (booking.customerLastName || "");
          return booking;
        });
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error :", error);
      } finally {
        setLoading(false);
      }
    },
    [admin._id]
  );

  // Initial Call
  useEffect(() => {
    getAllAgentBookings();
  }, [getAllAgentBookings]);

  useEffect(() => {
    if (dateFilters.fromDate && dateFilters.toDate) {
      let params = new URLSearchParams({
        fromDate: dateFilters.fromDate,
        toDate: dateFilters.toDate,
      });
      setLoading(true);
      getAllAgentBookings(params);
    } else {
      setLoading(true);
      getAllAgentBookings();
    }
  }, [dateFilters, getAllAgentBookings]);

  if (admin.role === "YSB_ADMIN") {
    return <Navigate to={"/admin"} replace></Navigate>;
  }

  return (
    <div className="admin-records-wrapper">
      <div className="bg-white rounded-lg border border-solid border-gray-300 flex flex-col gap-4 p-3 lg:px-8 lg:py-8">
        {/* Icons */}
        {/* <div className="icons self-end flex justify-center items-center gap-4 xl:gap-8">
          <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <UserIcon />
          </div>
          <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <NotificationIcon />
          </div>
        </div> */}
        {/* Table */}
        <div className="flex flex-col gap-4">
          <h2 className="m-0">Records</h2>

          {/* Filters and Export */}
          <FiltersAndExport
            setDateFilters={setDateFilters}
            csvData={bookings}
            csvHeaders={columns}
            fileName={"Records"}
          />

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
                spinning: !bookings || !bookings.length === 0 || loading,
              }}
              rowKey={(record) => record._id}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}
