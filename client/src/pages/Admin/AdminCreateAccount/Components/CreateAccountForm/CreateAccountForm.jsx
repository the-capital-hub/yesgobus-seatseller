import { Button } from "antd";
import { useRef, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { validateCreateAccountData } from "../../../../../utils/Admin/CreateAccountHelpers";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

const INITIAL_ERROR = {
  userId: "",
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
  // const [showError, setShowError] = useState(false);
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  async function handleCreateAccountSubmit(e) {
    e.preventDefault();

    const { fullName, email_phone, password, confirmPassword, userId } =
      e.target;
    const { error, hasError } = validateCreateAccountData({
      userId,
      fullName,
      email_phone,
      password,
      confirmPassword,
    });

    if (hasError) {
      setError(error);
      return;
    } else {
      let [firstName, lastName] = fullName.value.split(" ");
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
        userId: userId.value,
        firstName: firstName,
        lastName: lastName,
        phNum: phNum,
        email: email,
        password: password.value,
      };

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
          name="userId"
          id="admin-userId"
          className="create-input"
          placeholder="YesGoBus User ID"
          required
          onChange={handleChange}
          autoComplete="one-time-code"
          autoFocus
        />
        {error.userId && (
          <em className="text-error text-xs ps-4 slide-down">{error.userId}</em>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          name="fullName"
          id="admin-fullname"
          className="create-input"
          placeholder="Full Name"
          required
          onChange={handleChange}
          autoComplete="one-time-code"
        />
        {error.fullName && (
          <em className="text-error text-xs ps-4 slide-down">
            {error.fullName}
          </em>
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
          autoComplete="one-time-code"
        />
        {error.email_phone && (
          <em className="text-error text-xs ps-4 slide-down">
            {error.email_phone}
          </em>
        )}
      </div>

      <div
        className="flex flex-col gap-1 cursor-text"
        onClick={() => passwordRef.current.focus()}
      >
        <div className="create-input flex items-center gap-3">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            id="admin-password"
            className="flex-grow h-full"
            placeholder="Password"
            required
            onChange={handleChange}
            autoComplete="one-time-code"
            ref={passwordRef}
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

      <div
        className="flex flex-col gap-1 cursor-text"
        onClick={() => confirmPasswordRef.current.focus()}
      >
        <div className="create-input flex items-center gap-3">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            id="admin-confirmPassword"
            className="flex-grow h-full"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
            autoComplete="one-time-code"
            ref={confirmPasswordRef}
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
          <em className="text-error text-xs ps-4 slide-down">
            {error.confirmPassword}
          </em>
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
