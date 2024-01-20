import { Image } from "antd";
import "./AdminCreateAccount.scss";
// import { google, facebook } from "../../../assets/login";
import { WatermarkIcon } from "../../../assets/contact";
import CreateAccountForm from "./Components/CreateAccountForm/CreateAccountForm";

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
              className="text-3xl md:text-5xl text-center max-w-4xl"
              style={{ margin: "0", color: "#1B1D58" }}
            >
              Create Business Development Associate (BDA) Account
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

          <CreateAccountForm />
        </div>
      </div>
    </div>
  );
}
