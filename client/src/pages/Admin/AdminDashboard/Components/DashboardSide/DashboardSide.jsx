import "./DashboardSide.scss";
import TransactionArrow from "../TransactionArrow/TransactionArrow";
import SideHistory from "../SideHistory/SideHistory";
import { WatermarkIcon } from "../../../../../assets/contact";
import { useOutletContext } from "react-router-dom";

export default function DashboardSide() {
  const { admin } = useOutletContext();
  let fullName = admin?.firstName + " " + admin?.lastName || "Full Name";

  return (
    <div className="shortBoard border border-solid border-gray-300 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col gap-1 items-center pt-2">
        {/* Profile Picture */}
        <img
          src={WatermarkIcon}
          alt="username"
          width={65}
          height={65}
          className="object-contain rounded-full border border-solid border-gray-300"
        />

        {/* Name */}
        <p className="m-0 text-lg">{fullName}</p>

        {/* Icons */}
        <div className="flex items-center gap-4">
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
