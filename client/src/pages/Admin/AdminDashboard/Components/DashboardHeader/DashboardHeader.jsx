import { RiSearch2Line } from "react-icons/ri";
import "./DashboardHeader.scss";
import UserIcon from "../../../../../components/SvgIcons/UserIcon";
import NotificationIcon from "../../../../../components/SvgIcons/NotificationIcon";
import VirtualCard from "../VirtualCard/VirtualCard";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <div
          className="flex items-center gap-4 bg-white border border-solid border-gray-200 shadow-lg rounded-lg p-4"
          style={{ maxWidth: 450, minHeight: 38, width: "100%" }}
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
        <div className="icons flex items-center gap-8">
          <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <UserIcon />
          </div>
          <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <NotificationIcon />
          </div>
        </div>
      </div>

      {/* Heading */}
      <h2 className="m-0">Dashboard</h2>

      {/* Cards */}
      <div
        className="cards-container flex flex-col items-center gap-3 rounded-lg bg-white p-3 border border-solid border-gray-300 shadow-lg 
        lg:flex-row lg:gap-11 lg:p-11"
      >
        {["#3f3f3f", "#fd5901"].map((color, index) => {
          return <VirtualCard color={color} key={`${color}-${index}`} />;
        })}
      </div>
    </div>
  );
}
