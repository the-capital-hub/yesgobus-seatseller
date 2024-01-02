import { NavLink, useNavigate } from "react-router-dom";
import {
  IconAgents,
  IconDashboard,
  IconRecords,
  IconTrack,
  IconWallet,
} from "../../../../../components/Admin/SvgIcons";
import { LuLogOut } from "react-icons/lu";
import { MdMenu } from "react-icons/md";
import "./AdminSidebar.scss";
import { useRef } from "react";
import { Button, Modal } from "antd";
import { ADMIN_KEY } from "../../../AdminLogin/AdminLogin";
import { logo } from "../../../../../assets/index";

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
];

export default function AdminSidebar({ admin }) {
  const navigate = useNavigate();

  const [modal, contextHolder] = Modal.useModal();
  const navigationRef = useRef();

  function handleMenuClick() {
    navigationRef.current.classList.toggle("collapsed");
  }

  function handleLinkClick() {
    navigationRef.current.classList.add("collapsed");
  }

  function logoutModal() {
    modal.confirm({
      title: "Logout",
      content: "Are you sure you want to logout?",
      okText: "Logout",
      cancelText: "Cancel",
      centered: true,
      maskClosable: true,
      onOk() {
        handleLogout();
      },
    });
  }

  function handleLogout() {
    localStorage.removeItem(`${ADMIN_KEY}-loggedInAdmin`);
    localStorage.removeItem(`${ADMIN_KEY}-token`);
    navigate("/admin/login");
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
        <img src={logo} alt="YesGoBus" className="h-12 lg:h-auto lg:w-1/2" />
      </div>

      <div className={`navigation py-10 h-full`} ref={navigationRef}>
        <nav className="flex flex-col gap-5 h-full">
          {NAVLINKS.map(({ label, icon, link }, index) => {
            if (label === "Track Agent" && admin.role !== "YSB_ADMIN") {
              return null;
            }
            if (label === "Records" && admin.role === "YSB_ADMIN") {
              return null;
            }
            return (
              <NavLink
                to={link}
                className={"nav-item"}
                key={label}
                onClick={handleLinkClick}
              >
                <span className="sidebar-link p-5">
                  <span style={{ flex: "0 0 20px" }}>{icon}</span>{" "}
                  <p className="m-0 lg:hidden xl:block">{label}</p>
                </span>
              </NavLink>
            );
          })}

          {/* logout */}
          <div className={"nav-item mt-auto"} onClick={logoutModal}>
            <span className="sidebar-link p-5">
              <span style={{ flex: "0 0 20px" }}>
                <LuLogOut />
              </span>{" "}
              <p className="m-0 lg:hidden xl:block">Logout</p>
            </span>
          </div>
        </nav>
      </div>
      {contextHolder}
    </div>
  );
}
