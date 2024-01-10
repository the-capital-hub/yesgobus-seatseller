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
    sorter: (a, b) => a.bookingsMade - b.bookingsMade,
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
    key: "revenue",
    sorter: (a, b) => a.revenue - b.revenue,
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
            spinning:
              !agentPerformanceReport || !agentPerformanceReport.length === 0,
          }}
          scroll={{ x: true }}
          rowKey={(record) => `${record.agentId}-${record.userId}`}
        />
      </ConfigProvider>
      {/* </Spin> */}
    </div>
  );
}
