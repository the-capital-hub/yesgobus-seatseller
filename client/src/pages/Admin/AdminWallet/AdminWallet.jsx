import { Card } from "antd";
// import HeaderWithSort from "../../../components/Admin/HeaderWithSort/HeaderWithSort";
import WalletCard from "../../../components/Admin/WalletCard/WalletCard";
import "./AdminWallet.scss";
import { useState, useEffect } from "react";
import { getBalanceAPI } from "../../../api/admin";
import TransactionArrow from "../../../components/Admin/TransactionArrow/TransactionArrow";
import WalletRefunded from "./Components/WalletRefunded/WalletRefunded";
import WalletSales from "./Components/WalletSales/WalletSales";
import { ADMIN_KEY } from "../AdminLogin/AdminLogin";

const AdminWallet = () => {
  const [balance, setBalance] = useState(null);
  const loggedInAdmin = JSON.parse(localStorage.getItem(`${ADMIN_KEY}-loggedInAdmin`));

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await getBalanceAPI();
        setBalance(response);
      } catch (error) {
        console.error("Error :", error);
      }
    };
    getBalance();
  }, []);

  return (
    <div className="admin-wallet-wrapper">
      {/* <HeaderWithSort /> */}
      <h2 className="m-0">Wallet</h2>
      {/* Wallet Cards */}
      <div className="wallet-cards flex flex-col md:flex-row gap-3 items-center md:items-stretch flex-wrap">
        {loggedInAdmin?.role === "YSB_ADMIN" &&
          <>
            <WalletCard
              color="#fd5901"
              name={"VRL Wallet"}
              balance={balance?.vrl}
            />
            <WalletCard
              color="#3f3f3f"
              name={"Bitlasoft Wallet"}
              balance={balance?.ticketSimply}
            />
          </>
        }

        <Card
          className="border border-solid border-gray-300 shadow-lg"
          hoverable
        >
          <div className="w-48 flex justify-around items-center">
            <div className="flex flex-col gap-4 items-center">
              {/* <HiArrowSmUp
                size={40}
                color="#fd5901"
                className="rounded-full p-3 bg-gray-200"
              /> */}

              <TransactionArrow size="large" />

              <h4 className="m-0">Sales</h4>
            </div>
            <div className="flex flex-col gap-4 items-center">
              {/* <HiArrowSmDown
                size={40}
                className="rounded-full p-3 bg-gray-200"
              /> */}
              <TransactionArrow
                rotateClass="rotate-180"
                colorClass="text-black"
                size="large"
              />
              <h4 className="m-0">Refund</h4>
            </div>
          </div>
        </Card>
      </div>

      {/* History Refunded */}
      <WalletRefunded />

      {/* History Sales*/}
      <WalletSales />
    </div>
  );
};

export default AdminWallet;
