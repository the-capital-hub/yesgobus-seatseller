import { Drawer as AntdDrawer } from "antd";
import "./Drawer.scss";
import placeholder from "../../../../../assets/cabs/placeholder";
import { AiFillHome } from "react-icons/ai";
import { TbTicket, TbMessageQuestion } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";
import { CgSupport } from "react-icons/cg";
import { RxExit } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const Drawer = ({ showDrawer, setShowDrawer }) => {
  const toggleDrawer = () => setShowDrawer(false);

  return (
    <AntdDrawer
      id="navigation-drawer"
      placement="left"
      closable={false}
      open={showDrawer}
    >
      <img src={placeholder.user} alt="" />
      <h4 onClick={toggleDrawer}>My Profile</h4>
      <hr />
      <NavLink to="" className="tempActive" onClick={toggleDrawer}>
        <AiFillHome />
        Home
      </NavLink>
      <NavLink to="" onClick={toggleDrawer}>
        <TbTicket />
        Tickets
      </NavLink>
      <NavLink to="" onClick={toggleDrawer}>
        <IoWalletOutline />
        Wallet
      </NavLink>
      <NavLink to="" onClick={toggleDrawer}>
        <TbMessageQuestion />
        Help
      </NavLink>
      <NavLink to="" onClick={toggleDrawer}>
        <CgSupport />
        Support
      </NavLink>
      <hr />
      <NavLink to="" onClick={toggleDrawer}>
        <RxExit />
        Log out
      </NavLink>
    </AntdDrawer>
  );
};

export default Drawer;
