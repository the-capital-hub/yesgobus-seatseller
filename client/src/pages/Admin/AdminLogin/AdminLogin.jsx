import { Button, Image } from "antd";
import "./AdminLogin.scss";
import { Link } from "react-router-dom";
import { WatermarkIcon } from "../../../assets/contact";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function AdminLogin() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function handleLoginSubmit(e) {
    e.preventDefault();
  }

  return (
    <div
      className="login-wrapper flex items-center"
      style={{ height: "100dvh" }}
    >
      <div className="login-container flex flex-col gap-7 w-full">
        <div className="mx-auto">
          <Image
            src={WatermarkIcon}
            alt="YesGoBus Tour and Travel"
            width={250}
            preview={false}
          />
        </div>

        <div className="heading">
          <h1
            className="text-3xl md:text-5xl text-center"
            style={{ margin: "0", color: "#1B1D58" }}
          >
            Login to Admin
          </h1>
        </div>

        {/* Login form */}
        <form
          onSubmit={handleLoginSubmit}
          className="admin-login-form flex flex-col gap-5"
        >
          <input
            type="text"
            name="email_phone"
            id="admin-email_phone"
            className="create-input"
            placeholder="Email / Phone Number"
          />

          <div className="create-input flex items-center gap-3">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="admin-password"
              className="flex-grow h-full"
              placeholder="Password"
            />
            <span
              className="cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <IoMdEye size={20} color="#8b8b8b" />
              ) : (
                <IoMdEyeOff size={20} color="#8b8b8b" />
              )}
            </span>
          </div>

          <div className="flex flex-col items-center gap-7 my-7">
            <Link
              to={"/admin/create-account"}
              className="text-primary text-xl no-underline "
            >
              Create an Account
            </Link>
            <Button
              htmlType="button"
              type="primary"
              shape="round"
              size="large"
              style={{ paddingInline: "3.5rem" }}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
