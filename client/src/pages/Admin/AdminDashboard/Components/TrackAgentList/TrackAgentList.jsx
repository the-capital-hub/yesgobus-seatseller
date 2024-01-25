import { getAgentPerfomanceReport } from "../../../../../api/admin";
import { useEffect, useState } from "react";
import { Table, Spin, ConfigProvider } from "antd";
import FiltersAndExport from "../../../../../components/Admin/FiltersAndExport/FiltersAndExport";

const performanceColumn = [
  {
    title: "BDA Name",
    dataIndex: "agentName",
    key: "agentName",
    label: "BDA Name",
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
    render: (_, record) => {
      let amount = Number.parseFloat(+record.revenue).toFixed(2);
      return <p>{amount}</p>;
    },
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
  const [dateFilters, setDateFilters] = useState({
    fromDate: null,
    toDate: null,
  });
  const [loading, setLoading] = useState(false);

  // Fetch function
  const getPerfomanceReport = async (params) => {
    try {
      const response = await getAgentPerfomanceReport(params);
      setAgentPerformanceReport(response.data);
    } catch (error) {
      console.error("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial call
  useEffect(() => {
    getPerfomanceReport();
  }, []);

  // Refetch when dateFilters change
  useEffect(() => {
    if (dateFilters.fromDate && dateFilters.toDate) {
      let params = new URLSearchParams({
        fromDate: dateFilters.fromDate,
        toDate: dateFilters.toDate,
      });
      setLoading(true);
      getPerfomanceReport(params);
    } else {
      setLoading(true);
      getPerfomanceReport();
    }
  }, [dateFilters]);

  return (
    <div className="list-container">
      {/* Filters and Export */}
      <FiltersAndExport
        setDateFilters={setDateFilters}
        fileName={"AgentReport"}
        csvData={agentPerformanceReport}
        csvHeaders={performanceColumn}
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
              !agentPerformanceReport ||
              !agentPerformanceReport.length === 0 ||
              loading,
          }}
          scroll={{ x: true }}
          rowKey={(record) => `${record.agentId}-${record.userId}`}
        />
      </ConfigProvider>
      {/* </Spin> */}
    </div>
  );
}
