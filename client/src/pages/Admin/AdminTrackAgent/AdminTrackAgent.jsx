import "./AdminTrackAgent.scss";
// import HeaderWithSort from "../../../components/Admin/HeaderWithSort/HeaderWithSort";
import { Table, Space, Spin, Modal, Button } from "antd";
import {
  getAgentPerfomanceReport,
  getAllPendingAgents,
  approveAgent,
  rejectAgent,
} from "../../../api/admin";
import { useState, useEffect } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import LimitSelect from "./Components/LimitSelect/LimitSelect";

function AdminTrackAgent() {
  const [pendingAgents, setPendingAgents] = useState(null);
  const [agentPerformanceReport, setAgentPerformanceReport] = useState(null);
  const [modal, contextHolder] = Modal.useModal();
  const { admin } = useOutletContext();

  const performanceColumn = [
    {
      title: "BDA Name",
      label: "BDA Name",
      dataIndex: "agentName",
      key: "agentName",
    },
    {
      title: "No of Bookings Made",
      label: "No of Bookings Made",
      dataIndex: "bookingsMade",
      key: "bookingsMade",
      sorter: (a, b) => a.bookingsMade - b.bookingsMade,
    },
    {
      title: "Revenue",
      label: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      sorter: (a, b) => a.revenue - b.revenue,
      render: (_, record) => {
        let amount = Number.parseFloat(+record.revenue).toFixed(2);
        return <p>{amount}</p>;
      },
    },
    {
      title: "UserId",
      label: "UserId",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Ticket Limit",
      label: "Ticket Limit",
      dataIndex: "maxTicketLimit",
      key: "maxTicketLimit",
      render: (_, record) => {
        return <LimitSelect record={record} />;
      },
    },
  ];

  const pendingAccountColumn = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Phone Number",
      dataIndex: "phNum",
      key: "phNum",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => acceptModel(record._id)}
            style={{ color: "green", cursor: "pointer" }}
          >
            Accept
          </a>
          <a
            onClick={() => rejectModel(record._id)}
            style={{ color: "red", cursor: "pointer" }}
          >
            Reject
          </a>
        </Space>
      ),
    },
  ];

  const getPendingAgents = async () => {
    try {
      const response = await getAllPendingAgents();
      console.log(response);
      setPendingAgents(response.data);
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  const getPerfomanceReport = async () => {
    try {
      const response = await getAgentPerfomanceReport();
      setAgentPerformanceReport(response.data);
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  useEffect(() => {
    getPerfomanceReport();
    getPendingAgents();
  }, []);

  function acceptModel(agentId) {
    modal.confirm({
      title: "Accept agent",
      content: "Are you sure you want to accept this agent account?",
      okText: "Accept",
      cancelText: "Cancel",
      centered: true,
      maskClosable: true,
      onOk() {
        handleAccept(agentId);
      },
    });
  }

  function rejectModel(agentId) {
    modal.confirm({
      title: "Reject Agent",
      content: "Are you sure you want to reject this agent account?",
      okText: "Reject",
      cancelText: "Cancel",
      centered: true,
      maskClosable: true,
      onOk() {
        handleReject(agentId);
      },
    });
  }

  const handleAccept = async (agentId) => {
    try {
      await approveAgent(agentId);
      alert("Agent account accepted");
      getPerfomanceReport();
      getPendingAgents();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleReject = async (agentId) => {
    try {
      await rejectAgent(agentId);
      alert("Agent account rejected");
      getPerfomanceReport();
      getPendingAgents();
    } catch (error) {
      console.log("Error", error);
    }
  };

  if (admin.role !== "YSB_ADMIN") {
    return <Navigate to={"/admin"} replace></Navigate>;
  }

  return (
    <div className="track-agent-wrapper bg-white lg:rounded-xl my-4 mx-8 border border-solid border-gray-300">
      {/* <HeaderWithSort /> */}

      <div className="trackAgent-container flex flex-col gap-5 py-5">
        <h2 className="m-0">
          Track Business Development Associate (BDA) Performance
        </h2>
        {agentPerformanceReport?.length > 0 && (
          <div className="flex flex-end pb-2 flex-container">
            <Button type="primary" icon={<DownloadOutlined />}>
              <CSVLink
                data={agentPerformanceReport}
                headers={performanceColumn}
                filename={"AgentReport.csv"}
              >
                Export to CSV
              </CSVLink>
            </Button>
          </div>
        )}
        <Table
          dataSource={agentPerformanceReport}
          columns={performanceColumn}
          bordered={false}
          footer={() => ""}
          className="w-full rounded-lg border border-solid border-gray-300 bg-white shadow-xl"
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
          rowKey={(record) => record.agentId}
        />
      </div>

      <div className="trackAgent-container flex flex-col gap-5 py-5">
        <h2 className="m-0">
          Pending Business Development Associate (BDA) Account
        </h2>
        <Table
          dataSource={pendingAgents}
          columns={pendingAccountColumn}
          // pagination={false}
          bordered={false}
          footer={() => ""}
          className="w-full rounded-lg border border-solid border-gray-300 bg-white shadow-xl"
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
            spinning: !pendingAgents || !pendingAgents.length === 0,
          }}
        />
      </div>
      {contextHolder}
    </div>
  );
}

export default AdminTrackAgent;
