import React, { useState } from "react";
import "./Login.scss";
import socialMedia from "../../../assets/CabDriver/socialMedia/index";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
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
    navigate(`/cab_driver/home`);
    // Check if the password and confirm password match
      // Perform your submit logic here
      console.log("Form submitted:", formData);
  
  };
  return (
    <div className="login_account_section">
      <div className="welcome">
        <h4>Welcome Back !  </h4>
        <h3>Log in</h3>
      </div>
      <div className="login_form">
        <form onSubmit={handleSubmit}>
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
             Log In
          </button>
        </form>
      </div>
      <div className="other_login_methods">
        <p>
        I don’t have an account ? <span> <Link
              to="/cab_driver/create_account"
            >
              Create account
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

export default Login;
