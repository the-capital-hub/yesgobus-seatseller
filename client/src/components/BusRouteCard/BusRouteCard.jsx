import React, { useState, useEffect, useRef } from "react";
import "./BusRouteCard.scss";
import { Spin } from "antd";
import { useSpeechRecognition } from 'react-speech-kit';
import MicImage from "../../assets/busbooking/micimg.svg";

const BusRouteCard = ({ title, location, setLocation, date, suggestions, loading, setLocationQuery, style, color }) => {
  const [inputValue, setInputValue] = useState(location);
  const [value, setValue] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setInputValue(result);
      setLocationQuery(result);
      setShowSuggestions(true);
    },
  });

  useEffect(() => {
    setInputValue(location);
  }, [location]);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const delay = 1000;

  const handleInputChange = (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
    setLocationQuery(newInputValue);
    setShowSuggestions(true);
  };

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    if (inputDate < currentDate) {
      setInputValue(currentDate);
    } else {
      setInputValue(inputDate);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const handleClickOutside = (e) => {
    if (!inputRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLocation(inputValue);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    setShowSuggestions(true);
  };
  const currentDate = new Date().toISOString().split('T')[0];
  return (
    <div className="BusRouteCard" ref={inputRef} style={style}>
      <p style={color}>{title}</p>
      {date ? (
        <input type="date" min={currentDate} value={inputValue} onChange={handleDateChange} />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="search"
            value={inputValue}
            onInput={handleInputChange}
            onClick={handleInputClick}
          />
          <img src={MicImage} width="30" height="30" onMouseDown={listen} onMouseUp={stop} />
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
