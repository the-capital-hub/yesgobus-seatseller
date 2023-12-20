import React, { useState, useEffect, useRef } from "react";
import "./BusRouteCard.scss";
import { Spin } from "antd";
// import MicImage from "../../assets/busbooking/micImg.svg";
// import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import VoiceSearch from "./Components/VoiceSearch/VoiceSearch";
import { useSelector } from "react-redux";
import { selectIsMobileApp } from "../../stores/slices/designSlice";

const BusRouteCard = ({
  title,
  location,
  setLocation,
  date,
  suggestions,
  loading,
  setLocationQuery,
  style,
  color,
  setData,
}) => {
  const isMobileApp = useSelector(selectIsMobileApp);

  // const [recording, setRecording] = useState(false);

  // useEffect(() => {
  //   SpeechRecognition.requestPermissions();
  // }, []);

  // async function startRecording(setSpeechLocation) {
  //   const available = await SpeechRecognition.available();
  //   if (available) {
  //     setRecording(true);
  //     SpeechRecognition.start({
  //       language: "en-US",
  //       // maxResults: 2,
  //       prompt: "Say something",
  //       partialResults: true,
  //       popup: false,
  //     });

  //     SpeechRecognition.addListener("partialResults", async (data) => {
  //       if (data.matches && data.matches.length > 0) {
  //         setInputValue(data.matches[0]);
  //         setSpeechLocation(data.matches[0]);
  //         setShowSuggestions(true);
  //         setRecording(false);
  //         await SpeechRecognition.stop();
  //       }
  //     });
  //   }
  // }

  // async function stopRecording() {
  //   setRecording(false);
  //   await SpeechRecognition.stop();
  // }

  const [inputValue, setInputValue] = useState(location);

  useEffect(() => {
    setInputValue(location);
  }, [location]);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const delay = 1000;

  const handleInputChange = (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
    setData(newInputValue);
    setLocationQuery(newInputValue);
    setShowSuggestions(true);
  };

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    if (inputDate < currentDate) {
      setInputValue(currentDate);
      setData(currentDate);
    } else {
      setInputValue(inputDate);
      setData(inputDate);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setData(suggestion);
    setShowSuggestions(false);
  };

  const handleClickOutside = (e) => {
    if (!inputRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setLocation(inputValue);
  //   }, delay);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [inputValue]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    setShowSuggestions(true);
  };
  const currentDate = new Date().toISOString().split("T")[0];
  return (
    <div className="BusRouteCard" ref={inputRef} style={style}>
      <p style={color}>{title}</p>
      {date ? (
        <input
          type="date"
          min={currentDate}
          value={inputValue}
          onChange={handleDateChange}
        />
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="search"
            value={inputValue}
            onInput={handleInputChange}
            onClick={handleInputClick}
          />
          {/* <img
            src={MicImage}
            width="30"
            height="30"
            onClick={() => startRecording(setLocationQuery)}
          /> */}

          {isMobileApp && (
            <VoiceSearch
              setLocationQuery={setLocationQuery}
              setInputValue={setInputValue}
            />
          )}
        </div>
      )}
      {showSuggestions && (
        <ul className="suggestion-list">
          {loading ? (
            <li className="loading-spinner">
              <Spin size="small" />
            </li>
          ) : (
            suggestions
              .filter(({ name }) => !/\d/.test(name) && !name.includes(" "))
              .map((suggestion) => (
                <li
                  key={suggestion._id}
                  onClick={() => handleSuggestionClick(suggestion.name)}
                >
                  {suggestion.name}
                </li>
              ))
          )}
        </ul>
      )}
    </div>
  );
};

export default BusRouteCard;
