import { Button } from "antd";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { validateCreateAccountData } from "../../../../../utils/Admin/CreateAccountHelpers";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

const INITIAL_ERROR = {
  fullName: "",
  email_phone: "",
  password: "",
  confirmPassword: "",
};

export default function CreateAccountForm() {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState(INITIAL_ERROR);
  const [showError, setShowError] = useState(false);

  async function handleCreateAccountSubmit(e) {
    e.preventDefault();

    const { fullName, email_phone, password, confirmPassword } = e.target;

    const { error, hasError } = validateCreateAccountData({
      fullName,
      email_phone,
      password,
      confirmPassword,
    });

    if (hasError) {
      setError(error);
      return;
    } else {
      let phNum;
      let email;
      if (email_phone.value) {
        if (EMAIL_REGEX.test(email_phone.value)) {
          email = email_phone.value;
        } else if (PHONE_REGEX.test(email_phone.value)) {
          phNum = email_phone.value;
        }
      }

      let formData = {
        fullName: fullName.value,
        phNum: phNum,
        email: email,
        password: password.value,
      };

      console.log("formData", formData);

      navigate("/admin/account-details", { state: formData });
    }
  }

  function handleChange(e) {
    let { name, value } = e.target;
    if (value && error[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  }

  return (
    <form
      className="create-account-form"
      onSubmit={handleCreateAccountSubmit}
      noValidate
    >
      <div className="flex flex-col gap-1">
        <input
          type="text"
          name="fullName"
          id="admin-fullname"
          className="create-input"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />
        {error.fullName && (
          <em className="text-error text-xs ps-4">{error.fullName}</em>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          name="email_phone"
          id="admin-email_phone"
          className="create-input"
          placeholder="Email / Phone Number"
          required
          onChange={handleChange}
        />
        {error.email_phone && (
          <em className="text-error text-xs ps-4">{error.email_phone}</em>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="create-input flex items-center gap-3">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            id="admin-password"
            className="flex-grow h-full"
            placeholder="Password"
            required
            onChange={handleChange}
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
          <em className="text-error text-xs ps-4">{error.password}</em>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="create-input flex items-center gap-3">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            id="admin-confirmPassword"
            className="flex-grow h-full"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
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
        {error.confirmPassword && (
          <em className="text-error text-xs ps-4">{error.confirmPassword}</em>
        )}
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
