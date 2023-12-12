import React, { useState, useEffect } from "react";
import { blackhamburger, hamburger, logo } from "../../assets";
import { useNavigate, Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.scss";
import { blacklogo } from "../../assets/homepage";
import UserIcon from "../SvgIcons/UserIcon";
import { useSelector } from "react-redux";
import { selectIsMobileApp } from "../../stores/slices/designSlice";

const Navbar = ({ page }) => {

  const isMobileApp = useSelector(selectIsMobileApp);

  // let translateElement;

  // const googleTranslateElementInit = () => {
  //   translateElement = new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: 'en',
  //       includedLanguages: 'en,kn',
  //       layout: window.google.translate.TranslateElement.InlineLayout.TOP_RIGHT,
  //     },
  //     "google_translate_element"
  //   );

  // };

  // function changeLanguage(languageCode) {
  //   translateElement.showInvisible();
  //   translateElement.selectLanguage(languageCode);
  // }

  // useEffect(() => {
  //   const translateElement = document.getElementById("google_translate_element");
  //   if (translateElement) {
  //     translateElement.innerHTML = "";
  //   }
  //   const script = document.createElement("script");
  //   script.src =
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   window.googleTranslateElementInit = googleTranslateElementInit;
  // }, []);


  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const loggedInUser = localStorage.getItem("loggedInUser");

  const menu = (
    <div className="burger-menu">
      <a href="/">
        <span>Home</span>
      </a>
      <a href="/busbooking">
        <span>Bus</span>
      </a>
      {isMobileApp &&
        <a href="/cabs">
          <span>Cabs</span>
        </a>
      }

      <a href="/contactus">
        <span>Contact Us</span>
      </a>
    </div>
  );

  return (
    <nav className="navbar burger">
      <div className="left">
        {page === "home" ? (
          <img
            className="logo"
            onClick={() => navigate("/")}
            src={logo}
            width={50}
            height={50}
            alt=""
          />
        ) : (
          <img
            className="blacklogo"
            onClick={() => navigate("/")}
            src={blacklogo}
            width={50}
            alt=""
          />
        )}
        <a href="/busbooking">
          <span>Bus</span>
        </a>
        {isMobileApp &&
          <a href="/cabs">
            <span>Cabs</span>
          </a>
        }
        <a href="/contactus">
          <span>Contact Us</span>
        </a>
      </div>

      <div className="right">
        {loggedInUser ? (
          <Link to={`/profile`} className="user">
            <span className={page === "home" ? "user-icon" : "user-icon icon-change "}>
              <UserIcon />
            </span>
            <div className="user-name">{JSON.parse(loggedInUser).fullName}</div>
          </Link>
        ) : (
          <a href="/login">
            <Button text="Login / Signup" />
          </a>
        )}
        {/* <div id="google_translate_element"></div> */}
      </div>
      {/* {page === "home" ? (
        <img
          className="hamburger"
          onClick={() => setShowMenu(!showMenu)}
          src={hamburger}
          alt=""
        />
      ) : ( */}
      <>
        {/* <img
          className="hamburger"
          onClick={() => setShowMenu(!showMenu)}
          src={blackhamburger}
          alt=""
        /> */}
        <div className={`select_vehicle`}>
          {!isMobileApp && <button className="btn"><Link to={"/"} className="link">Home</Link></button>}
          <button className="btn"><Link to={"/busbooking"} className="link">Bus</Link></button>
        {isMobileApp &&
          <button className="btn"><Link to={"/cabs"} className="link">Cab</Link></button>
        }
          <button className="btn"><Link to={"/contactus"} className="link">Contact Us</Link></button>
        </div>
      </>
      {/* )} */}
      {showMenu && menu}
    </nav>
  );
};

export default Navbar;
