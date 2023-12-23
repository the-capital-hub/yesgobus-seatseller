import { Button, Divider, Row, Col } from "antd";
import "./AdminCreateAccount.scss";
import { google, facebook } from "../../../assets/login";
import Title from "antd/es/typography/Title";

export default function AdminCreateAccount() {
  return (
    <div className="admin-createAccount-wrapper">
      <div className="page-grid">
        {/* Create Account */}
        <div className="left-content">
          <div className="headings">
            <Title level={1} style={{ margin: "0" }}>
              Create an Account
            </Title>
            <p className="">Create account using social networks</p>

            <div className="socials">
              <div className="social-link">
                <img src={google} alt="Google" width={44} height={44} />
              </div>
              <div className="social-link">
                <img src={facebook} alt="Facebook" width={44} height={44} />
              </div>
            </div>
          </div>

          <div className="divider">
            <Divider style={{ borderColor: "#000" }}>Or</Divider>
          </div>

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
            <Button
              htmlType="button"
              type="primary"
              shape="round"
              style={{
                width: "fit-content",
                alignSelf: "center",
                backgroundColor: "#fd5901",
              }}
              size="large"
            >
              Create Account
            </Button>
          </form>
        </div>

        {/* Login */}
        <div className="right-content">
          <div className="welcome">
            <Title level={1} style={{ margin: "0" }}>
              Welcome Back!
            </Title>
            <p>Login Here</p>
            <Button
              htmlType="button"
              type="primary"
              shape="round"
              style={{ backgroundColor: "#fd5901" }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
