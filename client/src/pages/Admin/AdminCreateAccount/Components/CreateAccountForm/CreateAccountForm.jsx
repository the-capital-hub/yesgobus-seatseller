import { Button } from "antd";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function CreateAccountForm() {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  async function handleCreateAccountSubmit(e) {
    e.preventDefault();

    navigate("/admin/account-details");
  }

  return (
    <form className="create-account-form" onSubmit={handleCreateAccountSubmit}>
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
      <div className="create-input flex items-center gap-3">
        <input
          type={confirmPasswordVisible ? "text" : "password"}
          name="confirmPassword"
          id="admin-confirmPassword"
          className="flex-grow h-full"
          placeholder="Confirm Password"
        />
        <span
          className="cursor-pointer"
          onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        >
          {confirmPasswordVisible ? (
            <IoMdEye size={20} color="#8b8b8b" />
          ) : (
            <IoMdEyeOff size={20} color="#8b8b8b" />
          )}
        </span>
      </div>

      <div className="flex flex-col items-center gap-7 my-7">
        <Link
          to={"/admin/login"}
          className="text-primary text-xl no-underline "
        >
          Login to Account
        </Link>
        <Button htmlType="submit" type="primary" shape="round" size="large">
          Create Account
        </Button>
      </div>
    </form>
  );
}
