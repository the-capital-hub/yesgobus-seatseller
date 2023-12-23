import "./MobileBottomToolbar.scss";
import { GoHome } from "react-icons/go";
import { TiShoppingBag } from "react-icons/ti";
import { CiUser } from "react-icons/ci";
import { NavLink } from "react-router-dom";

export default function MobileBottomToolbar() {
  return (
    <div className="mobile-bottom-toolbar">
      <div className="icons_with_name">
        <div>
          <NavLink to={"home"}>
            <GoHome size={"18px"} />
          <span>Home</span>
          </NavLink>

        </div>
        <div>
          <NavLink to={"Wallet"}>
            <TiShoppingBag size={"18px"} />
          <span>Wallet</span>
          </NavLink>
        </div>
        <div>
          <NavLink to={"Account"}>
            <CiUser size={"18px"} />
          <span>Account</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
