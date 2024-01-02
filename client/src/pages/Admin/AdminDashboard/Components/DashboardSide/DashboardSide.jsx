import "./DashboardSide.scss";
import TransactionArrow from "../../../../../components/Admin/TransactionArrow/TransactionArrow";
import SideHistory from "../SideHistory/SideHistory";
import { WatermarkIcon } from "../../../../../assets/contact";
import { useOutletContext } from "react-router-dom";

export default function DashboardSide() {
  const { admin } = useOutletContext();
  let fullName = admin?.firstName + " " + admin?.lastName || "Full Name";
  let agentCode = admin.agentCode;

  return (
    <div
      className="shortBoard border border-solid border-gray-300 bg-white rounded-lg shadow-lg"
      id="dashboardSidebar"
    >
      <div className="flex flex-col gap-1 md:items-center pt-2">
        {/* Profile Picture */}
        <img
          src={WatermarkIcon}
          alt="username"
          width={65}
          height={65}
          className="object-contain rounded-full border border-solid border-gray-300 mx-auto"
        />

        {/* Name */}
        <p className="m-0 mx-auto text-lg">{fullName}</p>
        <p className="m-0 mx-auto text-lg">
          {agentCode && <span>Agent Code: {agentCode}</span>}
        </p>

        {/* Icons */}
        <div className="flex items-center gap-4 mx-auto">
          <div className="flex flex-col gap-2">
            <TransactionArrow />
            <p className="m-0 text-xs">Transfer</p>
          </div>
          <div className="flex flex-col gap-2">
            <TransactionArrow
              colorClass="text-black"
              rotateClass="rotate-180"
            />
            <p className="m-0 text-xs">Receive</p>
          </div>
        </div>

        {/* History */}
        <SideHistory />
      </div>
    </div>
  );
}
