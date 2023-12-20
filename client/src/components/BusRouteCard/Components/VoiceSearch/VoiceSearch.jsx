import { useEffect, useRef, useState } from "react";
import MicImage from "../../../../assets/busbooking/micImg.svg";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { Button, Drawer, Spin } from "antd";
import "./VoiceSearch.scss";

export default function VoiceSearch({ setLocationQuery, setInputValue }) {
  // const [recording, setRecording] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [placeholder, setPlaceholder] = useState("Try saying something....");

  useEffect(() => {
    async function getPermission() {
      const available = await SpeechRecognition.available();
      if (!available) {
        SpeechRecognition.requestPermissions();
      }
    }

    getPermission();
  }, []);

  async function startRecording() {
    const available = await SpeechRecognition.available();
    if (available) {
      // setRecording(true);
      SpeechRecognition.start({
        language: "en-US",
        // maxResults: 2,
        prompt: "Say something",
        partialResults: true,
        popup: false,
      });

      SpeechRecognition.addListener("partialResults", (data) => {
        if (data.matches && data.matches.length > 0) {
          setSearchValue(data.matches[0]);
        }
      });
    }
  }

  function stopRecording(cancelled) {
    SpeechRecognition.stop();
    SpeechRecognition.removeAllListeners();
    // console.log("Stopped");
    setShowModal(false);
    setPlaceholder("Try saying something...");
    clearStates();

    if (cancelled) {
      return;
    }

    // Send value to input
    if (searchValue) {
      setInputValue(searchValue);
      setLocationQuery(searchValue);
    }
  }

  //   Handle mic click
  function handleMicClick() {
    setShowModal(true);
    startRecording();
  }

  // Handle No Click
  function handleNoClick() {
    startRecording();
    clearStates();
    setPlaceholder("Try again...");
  }

  // ClearStates
  function onClose() {
    setShowModal(false);
    clearStates();
    stopRecording(true);
  }

  function clearStates() {
    // setRecording(false);
    setSearchValue("");
  }

  return (
    <div className="voice-search-wrapper">
      <button type="button" className="modal-trigger" onClick={handleMicClick}>
        <img src={MicImage} width="30" height="30" />
      </button>
      <Drawer
        title="Voice Search"
        placement={"bottom"}
        closable={true}
        onClose={onClose}
        open={showModal}
        key={"bottom"}
        height={"200px"}
        classNames={{ body: "drawer-body" }}
      >
        <div className="drawer-content">
          <div className="modal-mic">
            <img src={MicImage} width="30" height="30" />
          </div>
          {!searchValue ? (
            <>
              <p>{placeholder}</p>
              <Spin size="small" />
            </>
          ) : (
            <p className={` ${searchValue ? "search-result" : ""}`}>
              Did you mean{" "}
              <span className="" style={{ color: "#fd5901" }}>
                {searchValue}
              </span>
              ?
            </p>
          )}
        </div>
        <div className="action-buttons">
          <Button
            type="primary"
            onClick={() => stopRecording()}
            size="large"
            htmlType="button"
          >
            Yes
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleNoClick()}
            size="large"
            htmlType="button"
          >
            No
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
