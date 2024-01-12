// import { RiSearch2Line } from "react-icons/ri";
import "./DashboardHeader.scss";
// import UserIcon from "../../../../../components/SvgIcons/UserIcon";
// import NotificationIcon from "../../../../../components/SvgIcons/NotificationIcon";
import { useState, useEffect } from "react";
import { getBalanceAPI } from "../../../../../api/admin";
import WalletCard from "../../../../../components/Admin/WalletCard/WalletCard";
import { getAgentStats } from "../../../../../api/admin";
import { ADMIN_KEY } from "../../../AdminLogin/AdminLogin";

export default function DashboardHeader() {
  const [balance, setBalance] = useState(null);
  const loggedInAdmin = JSON.parse(localStorage.getItem(`${ADMIN_KEY}-loggedInAdmin`));
  const [agentStats, setAgentStats] = useState(null);

  const getBalance = async () => {
    try {
      const response = await getBalanceAPI();
      setBalance(response);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const getStats = async () => {
    try {
      const response = await getAgentStats(loggedInAdmin?._id);
      setAgentStats(response.data);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    if (loggedInAdmin?.role === "YSB_ADMIN") {
      getBalance();
    } else {
      getStats();
    }
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        {/* <div
          className="flex items-center gap-4 bg-white border border-solid border-gray-200 shadow-lg rounded-lg p-4 lg:w-full"
          style={{ maxWidth: 450, minHeight: 38 }}
        >
          <RiSearch2Line size={30} />
          <input
            type="search"
            name="search"
            id="search"
            className="border-0 outline-none bg-transparent w-full text-lg"
            placeholder="Search ..."
          />
        </div>
        <div className="icons flex justify-center items-center gap-4 xl:gap-8">
          <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <UserIcon />
          </div>
          <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <NotificationIcon />
          </div>
        </div> */}
      </div>

      {/* Heading */}
      <h2 className="m-0">Dashboard</h2>

      {/* Cards */}

      {loggedInAdmin?.role === "YSB_ADMIN" &&
        <div
          className="cards-container p-3 rounded-lg bg-white
          border border-solid border-gray-300 shadow-lg md:p-10"
        >
          <div className="flex items-center gap-3 md:gap-10 overflow-x-auto pb-2 flex-container">
            <WalletCard
              color={"#3f3f3f"}
              name={"VRL Wallet"}
              balance={balance?.vrl}
            />
            <WalletCard
              color={"#fd5901"}
              name={"Bitlasoft Wallet"}
              balance={balance?.ticketSimply}
            />
          </div>
        </div>
      }

      {loggedInAdmin?.role !== "YSB_ADMIN" &&
        <div
          className="cards-container p-3 rounded-lg bg-white
          border border-solid border-gray-300 shadow-lg md:p-10"
        >
          <div className="flex flex-wrap justify-between gap-2 md:gap-10 overflow-x-auto pb-2 flex-container">
            <WalletCard
              color={"#3f3f3f"}
              name={"Total booking"}
              balance={agentStats?.totalBookings || 0}
              stats
            />
            <WalletCard
              color={"#fd5901"}
              name={"Bookings this month"}
              balance={agentStats?.bookingsThisMonth || 0}
              stats
            />
            <WalletCard
              color={"#fd5901"}
              name={"Bookings last month"}
              balance={agentStats?.bookingsLastMonth || 0}
              stats
            />
            <WalletCard
              color={"#3f3f3f"}
              name={"Sales this month"}
              balance={`Rs. ${agentStats?.salesThisMonth || 0}`}
              stats
            />
            <WalletCard
              color={"#3f3f3f"}
              name={"Sales last month"}
              balance={`Rs. ${agentStats?.salesLastMonth || 0}`}
              stats
            />
            <WalletCard
              color={"#fd5901"}
              name={"Total all-time sales"}
              balance={`Rs. ${agentStats?.totalAllTimeSales || 0}`}
              stats
            />
          </div>
        </div>
      }
    </div>
  );
}
