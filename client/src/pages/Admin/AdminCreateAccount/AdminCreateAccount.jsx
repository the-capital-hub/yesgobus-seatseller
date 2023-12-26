import { Button, Divider, Row, Col, Image } from "antd";
import "./AdminCreateAccount.scss";
// import { google, facebook } from "../../../assets/login";
import { Link } from "react-router-dom";
import { WatermarkIcon } from "../../../assets/contact";

export default function AdminCreateAccount() {
  return (
    <div className="admin-createAccount-wrapper">
      <div className="page-grid">
        {/* Create Account */}
        <div className="left-content">
          <Image
            src={WatermarkIcon}
            alt="YesGoBus Tour and Travel"
            width={250}
            preview={false}
          />
          <div className="headings">
            <h1
              className="text-3xl md:text-5xl"
              style={{ margin: "0", color: "#1B1D58" }}
            >
              Create Admin Account
            </h1>
            {/* <p className="">Create account using social networks</p> */}

            {/* <div className="socials">
              <div className="social-link">
                <img src={google} alt="Google" width={44} height={44} />
              </div>
              <div className="social-link">
                <img src={facebook} alt="Facebook" width={44} height={44} />
              </div>
            </div> */}
          </div>

          {/* <div className="divider">
            <Divider style={{ borderColor: "#000" }}>Or</Divider>
          </div> */}

          <form className="create-account-form">
            <input
              type="text"
              name="fullName"
              id="admin-fullname"
              className="create-input"
              placeholder="Full Name"
            />
            <input
              type="text"
              name="email_phone"
              id="admin-email_phone"
              className="create-input"
              placeholder="Email / Phone Number"
            />
            <input
              type="password"
              name="password"
              id="admin-password"
              className="create-input"
              placeholder="Password"
            />
            <input
              type="password"
              name="confirmPassword"
              id="admin-confirmPassword"
              className="create-input"
              placeholder="Confirm Password"
            />

            <div className="flex flex-col items-center gap-7 my-7">
              <Link
                to={"/admin/login"}
                className="text-primary text-xl no-underline "
              >
                Login to Account
              </Link>
              <Button
                htmlType="button"
                type="primary"
                shape="round"
                size="large"
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
