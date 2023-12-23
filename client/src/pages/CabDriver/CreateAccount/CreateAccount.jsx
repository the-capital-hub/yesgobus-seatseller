import React, { useState } from "react";
import "./CreateAccount.scss";
import socialMedia from "../../../assets/CabDriver/socialMedia/index";
import { Link } from "react-router-dom";

function CreateAccount() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    checkBox: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the password and confirm password match
    if (formData.password === formData.confirmPassword) {
      // Perform your submit logic here
      console.log("Form submitted:", formData);
    } else {
      alert("Password and Confirm Password do not match!");
    }
  };
  return (
    <div className="create_account_section">
      <div className="welcome">
        <h4>Welcome </h4>
        <h3>Create new account</h3>
        <p>Please fill the details and create account</p>
      </div>
      <div className="create_account_form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter Full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Min 6 Characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Min 6 Characters"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="checkBox"
                checked={formData.checkBox}
                onChange={handleChange}
                className="largerCheckbox"
              />
              By Continuing, I agree to the <span>Terms of Use </span> &{" "}
              <span>Privacy Policy</span>
            </label>
          </div>
          <button type="submit" disabled={!formData.checkBox}>
            Create Account
          </button>
        </form>
      </div>
      <div className="other_login_methods">
        <p>
          Already have an account? <span> <Link
              to="/cab_driver/login"
            >
              Log In
            </Link></span>
        </p>
        <div className="or">
          <hr />
          <p>or</p>
          <hr />
        </div>
        <p>Continue with</p>
        <div className="social_media">
          <img src={socialMedia.google} alt="" />
          <img src={socialMedia.facebook} alt="" />
          <img src={socialMedia.apple} alt="" />
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
