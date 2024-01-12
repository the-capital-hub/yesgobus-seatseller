import React, { useEffect, useState } from "react";
import "./MyProfile.scss";
import axiosInstance from "../../../../utils/service";

export default function MyProfile() {
  useEffect(() => {
    const translateElement = document.getElementById(
      "google_translate_element"
    );
    if (translateElement) {
      translateElement.innerHTML = "";
    }
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,kn",
            layout:
              window.google.translate.TranslateElement.InlineLayout.TOP_RIGHT,
          },
          "google_translate_element"
        );
      };
    };
  }, []);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const [formData, setFormData] = useState({
    fullName: loggedInUser.fullName || "",
    email: loggedInUser.email || "",
    phoneNumber: loggedInUser.phoneNumber || "",
    gender: loggedInUser.gender || "Select Gender",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: updatedUser } = await axiosInstance.patch(
        `${import.meta.env.VITE_BASE_URL}/api/user/updateProfile/${
          loggedInUser._id
        }`,
        formData
      );
      if (updatedUser.status === 200) {
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser.data));
        alert("Profile Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my__profile">
      <h1>Profile Info</h1>
      <form onSubmit={handleSubmit} autoComplete="off" className="info__grid">
        <input
          type="Name"
          id="userId"
          name="userId"
          className={`profile__input ${loggedInUser.isAgent ? "agent" : ""}`}
          value={loggedInUser.userId}
          disabled
        />
        <input
          type="Name"
          id="name"
          name="fullName"
          placeholder="Enter Name"
          className="profile__input"
          value={formData.fullName}
          onChange={handleInputChange}
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          className="profile__input"
          value={formData.email}
          onChange={handleInputChange}
        />

        <input
          type="tel"
          name="phoneNumber"
          id="mobile"
          placeholder="Mobile Number"
          className="profile__input"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />

        <select
          name="gender"
          id="gender"
          className="profile__input select"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option
            value="Select Gender"
            disabled
            style={{ color: "rgba(121, 121, 121, 1)" }}
          >
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {/* <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="profile__input"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleInputChange}
        /> */}

        <button type="submit" className="save-btn orange__button">
          Save
        </button>
      </form>
      <div className="container">
        <h1>Change Language:</h1>
        <div id="google_translate_element"></div>
      </div>
    </div>
  );
}
