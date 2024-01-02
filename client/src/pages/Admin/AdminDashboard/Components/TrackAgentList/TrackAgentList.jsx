// import { Button } from "antd";
// import { Link } from "react-router-dom";
// import { WatermarkIcon } from "../../../../../assets/contact";
import { getAgentPerfomanceReport } from "../../../../../api/admin";
import { useEffect, useState } from "react";
import { Table, Spin, ConfigProvider } from "antd";

const performanceColumn = [
  {
    title: "Agent Name",
    dataIndex: "agentName",
    key: "agentName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "No of Bookings Made",
    dataIndex: "bookingsMade",
    key: "bookingsMade",
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
    key: "revenue",
  },
  {
    title: "UserId",
    dataIndex: "userId",
    key: "userId",
  },
];
export default function TrackAgentList() {
  const [agentPerformanceReport, setAgentPerformanceReport] = useState(null);

  useEffect(() => {
    const getPerfomanceReport = async () => {
      try {
        const response = await getAgentPerfomanceReport();
        setAgentPerformanceReport(response.data);
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    getPerfomanceReport();
  }, []);

  return (
    <div className="list-container">
      {/* <header className="list-bar grid grid-cols-1 min-[350px]:grid-cols-2 md:grid-cols-4 place-items-center gap-4 py-4 px-8">
        <p className="m-0 text-lg md:justify-self-start">Agent Name</p>
        <p className="m-0 text-lg">Email</p>
        <p className="m-0 text-lg">Phone</p>
        <p className="m-0 text-lg">Phone</p>
        <p className="m-0 text-lg md:justify-self-end w-[150px] text-center">
          Track
        </p>
      </header> */}
      {/* {agentPerformanceReport?.map((elem, index) => {
        return (
          <div
            className="list-bar grid grid-cols-1 min-[350px]:grid-cols-2 md:grid-cols-4 place-items-center gap-4 py-4 px-8"
            key={`${elem}-${index}`}
          >
            <div className="flex items-center gap-4 md:justify-self-start">
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
            <Link className="no-underline text-inherit md:justify-self-end w-[150px]">
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
      })} */}
      {/* <Spin spinning={loading}> */}
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
          dataSource={agentPerformanceReport}
          columns={performanceColumn}
          bordered={false}
          footer={() => ""}
          className="w-full rounded-lg border border-solid border-gray-300 bg-white shadow-xl overflow-hidden"
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
            spinning: !agentPerformanceReport || agentPerformanceReport === 0,
          }}
          scroll={{ x: true }}
        />
      </ConfigProvider>
      {/* </Spin> */}
    </div>
  );
}
