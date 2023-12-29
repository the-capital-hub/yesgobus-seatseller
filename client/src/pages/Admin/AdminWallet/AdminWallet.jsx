import { Card, Space, Table, Tag } from "antd";
import HeaderWithSort from "../../../components/Admin/HeaderWithSort/HeaderWithSort";
import WalletCard from "../../../components/Admin/WalletCard/WalletCard";
import "./AdminWallet.scss";
import { HiArrowSmUp, HiArrowSmDown } from "react-icons/hi";
import { useState, useEffect } from "react";
import { getBalanceAPI } from "../../../api/admin";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Date & Time",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  //   {
  //     title: "Actions",
  //     key: "tags",
  //     dataIndex: "tags",
  //     render: (_, { tags }) => (
  //       <>
  //         {tags.map((tag) => {
  //           let color = tag.length > 5 ? "geekblue" : "green";
  //           if (tag === "loser") {
  //             color = "volcano";
  //           }
  //           return (
  //             <Tag color={color} key={tag}>
  //               {tag.toUpperCase()}
  //             </Tag>
  //           );
  //         })}
  //       </>
  //     ),
  //   },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <a>View</a>
      </Space>
    ),
  },
];
const transactionData = [
  {
    key: 1,
    name: "John Doe",
    date: "2023-01-15",
    amount: 150.0,
  },
  {
    key: 2,
    name: "Alice Smith",
    date: "2023-02-05",
    amount: 75.5,
  },
  {
    key: 3,
    name: "Bob Johnson",
    date: "2023-03-20",
    amount: 200.0,
  },
  {
    key: 4,
    name: "Eva Williams",
    date: "2023-04-10",
    amount: 120.75,
  },
  {
    key: 5,
    name: "Charlie Brown",
    date: "2023-05-05",
    amount: 50.25,
  },
];

const AdminWallet = () => {
  const [balance, setBalance] = useState(null);

  const getBalance = async () => {
    try {
      const response = await getBalanceAPI();
      setBalance(response);
    } catch (error) {
      console.error("Error :", error);
    }
  }

  useEffect(() => {
    getBalance();
  }, [])

  return (
    <div className="admin-wallet-wrapper">
      <HeaderWithSort />
      <h2 className="m-0">Wallet</h2>
      {/* Wallet Cards */}
      <div className="wallet-cards flex flex-col md:flex-row gap-3 items-stretch">
        <WalletCard color="#fd5901" name={"VRL Wallet"} balance={balance?.vrl} />
        <WalletCard color="#3f3f3f" name={"Bitlasoft Wallet"} balance={balance?.ticketSimply} />
        <Card className="border border-solid border-gray-300 shadow-lg">
          <div className="w-48 flex justify-around items-center">
            <div className="flex flex-col gap-4 items-center">
              <HiArrowSmUp
                size={40}
                color="#fd5901"
                className="rounded-full p-3 bg-gray-200"
              />
              <h4 className="m-0">Transfer</h4>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <HiArrowSmDown
                size={40}
                className="rounded-full p-3 bg-gray-200"
              />
              <h4 className="m-0">Receive</h4>
            </div>
          </div>
        </Card>
      </div>
      {/* History Received */}
      <section className="history-wrapper flex flex-col gap-4">
        <h2 className="m-0 flex gap-2">
          History -{" "}
          <span className="flex items-center">
            <HiArrowSmDown /> Received
          </span>
        </h2>
        <Table
          columns={columns}
          dataSource={transactionData}
          className="box-container"
        />
      </section>
      {/* History Transferred*/}
      <section className="history-wrapper flex flex-col gap-4">
        <h2 className="m-0 flex gap-2">
          History -{" "}
          <span className="flex items-center">
            <HiArrowSmUp color="#fd5901" /> Transferred
          </span>
        </h2>
        <Table
          columns={columns}
          dataSource={transactionData}
          className="box-container"
        />
      </section>
    </div>
  );
};

export default AdminWallet;
