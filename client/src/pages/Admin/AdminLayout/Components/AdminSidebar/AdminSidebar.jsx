import { NavLink } from "react-router-dom";
import {
  IconAgents,
  IconDashboard,
  IconRecords,
  IconTrack,
  IconWallet,
} from "../../../../../components/Admin/SvgIcons";
import { LuLogOut } from "react-icons/lu";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import "./AdminSidebar.scss";
import { useRef } from "react";

const NAVLINKS = [
  {
    label: "Dashboard",
    icon: <IconDashboard />,
    link: "/admin/dashboard",
  },
  {
    label: "Wallet",
    icon: <IconWallet />,
    link: "/admin/wallet",
  },
  {
    label: "Records",
    icon: <IconRecords />,
    link: "/admin/records",
  },
  {
    label: "Track Agent",
    icon: <IconAgents />,
    link: "/admin/track-agents",
  },
  {
    label: "Track Buses",
    icon: <IconTrack />,
    link: "/admin/track-buses",
  },
  {
    label: "Logout",
    icon: <LuLogOut size={20} />,
    link: "",
  },
];

export default function AdminSidebar() {
  const navigationRef = useRef();

  function handleMenuClick() {
    navigationRef.current.classList.toggle("collapsed");
  }

  function handleLinkClick() {
    navigationRef.current.classList.add("collapsed");
  }

  return (
    <div
      className="bg-white lg:rounded-r-xl flex flex-col shadow-xl border border-solid border-gray-300"
      id="sidebar"
    >
      <div className="flex items-center gap-5 py-5 px-5 border-0 lg:justify-center lg:px-0 lg:py-10 lg:border-b lg:border-solid lg:border-gray-300">
        <button
          className="mobile-menu-trigger bg-transparent border-0 outline-none flex items-center lg:hidden"
          onClick={handleMenuClick}
        >
          <MdMenu size={30} />
        </button>
        <h1 className="m-0  text-center">LOGO</h1>
      </div>

      <div className={`navigation py-10 h-full`} ref={navigationRef}>
        <nav className="flex flex-col gap-5 h-full">
          {NAVLINKS.map(({ label, icon, link }, index) => {
            return (
              <NavLink
                to={link}
                className={"nav-item"}
                key={label}
                end={index === NAVLINKS.length - 1 ? true : false}
                onClick={handleLinkClick}
              >
                <span className="sidebar-link p-5">
                  <span style={{ flex: "0 0 20px" }}>{icon}</span>{" "}
                  <p className="m-0 lg:hidden xl:block">{label}</p>
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
