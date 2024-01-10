import { Button, Image, message } from "antd";
import "./AdminLogin.scss";
import { Link, useNavigate } from "react-router-dom";
import { WatermarkIcon } from "../../../assets/contact";
import { useRef, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { agentLoginAPI } from "../../../api/admin";
import { ValidateLoginData } from "../../../utils/Admin/CreateAccountHelpers";

export const ADMIN_KEY = "YGB-ADMIN";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  // local states
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef();

  async function handleLoginSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = Object.fromEntries(formData);
    // console.log("login data", loginData);

    const { error, hasError } = ValidateLoginData(loginData);
    if (hasError) {
      setError(error);
      return;
    }

    try {
      setLoading(true);
      messageApi.open({
        key: "login",
        type: "loading",
        content: "Verifying. Please wait.",
      });

      const { data, token, isMasterAdmin } = await agentLoginAPI(loginData);
      // console.log("login response", data, token);
      messageApi.open({
        key: "login",
        type: "success",
        content: "Login Successful",
        duration: 2,
      });

      localStorage.setItem(`${ADMIN_KEY}-token`, JSON.stringify(token));
      if (isMasterAdmin) {
        data.role = "YSB_ADMIN";
      } else {
        data.role = "YSB_AGENT";
      }
      localStorage.setItem(`${ADMIN_KEY}-loggedInAdmin`, JSON.stringify(data));
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      console.error("Error verifying details", error);
      messageApi.open({
        key: "login",
        type: "error",
        content: "Invalid Credentials",
      });
    } finally {
      setLoading(false);
    }
  }

  // Handle Input Change
  function handleInputChange(e) {
    let { name, value } = e.target;
    if (value && error[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  }

  return (
    <>
      {contextHolder}
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
            noValidate
          >
            <div className="flex flex-col gap-1">
              <input
                type="text"
                name="emailMobile"
                id="admin-email_phone"
                className="create-input"
                placeholder="Email / Phone Number"
                autoComplete="one-time-code"
                autoFocus
                required
                onChange={handleInputChange}
              />
              {error.emailMobile && (
                <em className="text-error text-xs ps-4 slide-down">
                  {error.emailMobile}
                </em>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div
                className="create-input flex items-center gap-3 cursor-text"
                onClick={() => passwordRef.current.focus()}
              >
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="admin-password"
                  className="flex-grow h-full"
                  placeholder="Password"
                  autoComplete="one-time-code"
                  ref={passwordRef}
                  required
                  onChange={handleInputChange}
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
              {error.password && (
                <em className="text-error text-xs ps-4 slide-down">
                  {error.password}
                </em>
              )}
            </div>

            <div className="flex flex-col items-center gap-7 my-7">
              <Link
                to={"/admin/create-account"}
                className="text-primary text-xl no-underline "
              >
                Create an Account
              </Link>
              <Button
                htmlType="submit"
                type="primary"
                shape="round"
                size="large"
                style={{ paddingInline: "3.5rem" }}
                disabled={loading}
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
