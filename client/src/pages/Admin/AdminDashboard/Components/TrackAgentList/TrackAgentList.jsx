import { getAgentPerfomanceReport } from "../../../../../api/admin";
import { useEffect, useState } from "react";
import { Table, Spin, ConfigProvider, Button } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import { CSVLink } from "react-csv";

const performanceColumn = [
  {
    title: "Agent Name",
    dataIndex: "agentName",
    key: "agentName",
    label: "Agent Name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    label: "Email",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
    label: "Phone Number",
  },
  {
    title: "No of Bookings Made",
    dataIndex: "bookingsMade",
    key: "bookingsMade",
    sorter: (a, b) => a.bookingsMade - b.bookingsMade,
    label: "No of Bookings Made",
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
    key: "revenue",
    sorter: (a, b) => a.revenue - b.revenue,
    label: "Revenue",
  },
  {
    title: "UserId",
    dataIndex: "userId",
    key: "userId",
    label: "UserId",
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
        {agentPerformanceReport?.length > 0 &&
          <div className="flex flex-end pb-2 flex-container">
            <Button type="primary" icon={<DownloadOutlined />} >
              <CSVLink data={agentPerformanceReport} headers={performanceColumn} filename={"AgentReport.csv"}>Export to CSV</CSVLink>
            </Button>
          </div>
        }
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
