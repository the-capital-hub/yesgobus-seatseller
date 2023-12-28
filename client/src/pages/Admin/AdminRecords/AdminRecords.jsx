import { ConfigProvider, Table } from "antd";
import NotificationIcon from "../../../components/SvgIcons/NotificationIcon";
import UserIcon from "../../../components/SvgIcons/UserIcon";
import "./AdminRecords.scss";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    timeOfBooking: "16:57 PM",
    operator: "Operator",
    from: "Bangalore",
    to: "Mysore",
    cost: "300",
    agent: "Agent",
  },
  {
    key: "2",
    name: "John",
    timeOfBooking: "12:37 PM",
    operator: "Operator",
    from: "Bangalore",
    to: "Hyderabad",
    cost: "1031",
    agent: "Agent",
  },
  {
    key: "3",
    name: "Mike",
    timeOfBooking: "16:57 PM",
    operator: "Operator",
    from: "Bangalore",
    to: "Mysore",
    cost: "300",
    agent: "Agent",
  },
  {
    key: "4",
    name: "John",
    timeOfBooking: "12:37 PM",
    operator: "Operator",
    from: "Bangalore",
    to: "Hyderabad",
    cost: "1031",
    agent: "Agent",
  },
  {
    key: "5",
    name: "Mike",
    timeOfBooking: "16:57 PM",
    operator: "Operator",
    from: "Bangalore",
    to: "Mysore",
    cost: "300",
    agent: "Agent",
  },
  {
    key: "6",
    name: "John",
    timeOfBooking: "12:37 PM",
    operator: "Operator",
    from: "Bangalore",
    to: "Hyderabad",
    cost: "1031",
    agent: "Agent",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Time of Booking",
    dataIndex: "timeOfBooking",
    key: "timeOfBooking",
  },
  {
    title: "Operator",
    dataIndex: "operator",
    key: "operator",
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
  },
  {
    title: "Cost (Rs)",
    dataIndex: "cost",
    key: "cost",
  },
  {
    title: "Agent",
    dataIndex: "agent",
    key: "agent",
  },
];

const tableStyles = {
  boxShadow: "4px 4px 30px 0px #00000026",
  borderRadius: "1rem",
};

export default function AdminRecords() {
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
              dataSource={dataSource}
              columns={columns}
              scroll={{ x: true }}
              bordered
              style={tableStyles}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}
