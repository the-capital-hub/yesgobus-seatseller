import { useEffect, useState } from "react";
import MicImage from "../../../../assets/busbooking/micImg.svg";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { Drawer, Modal, Spin } from "antd";
import "./VoiceSearch.scss";

export default function VoiceSearch({ setLocationQuery }) {
  const [recording, setRecording] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    SpeechRecognition.requestPermissions();
  }, []);

  async function startRecording(setSpeechLocation) {
    const available = await SpeechRecognition.available();
    if (available) {
      setRecording(true);
      SpeechRecognition.start({
        language: "en-US",
        // maxResults: 2,
        prompt: "Say something",
        partialResults: true,
        popup: false,
      });

      SpeechRecognition.addListener("partialResults", async (data) => {
        if (data.matches && data.matches.length > 0) {
          //   setInputValue(data.matches[0]);
          //   setSpeechLocation(data.matches[0]);
          //   setShowSuggestions(true);
          setRecording(false);
          setSearchValue(data.matches[0]);
          await SpeechRecognition.stop();
        }
      });
    }
  }

  //   Handle mic click
  function handleMicClick() {
    setShowModal(true);
    startRecording(setLocationQuery);
  }

  function onClose() {
    clearStates();
  }

  function clearStates() {
    setShowModal(false);
    setRecording(false);
    setSearchValue("");
  }

  return (
    <div className="voice-search-wrapper">
      <button type="button" className="modal-trigger">
        <img src={MicImage} width="30" height="30" onClick={handleMicClick} />
      </button>

      <Drawer
        title="Voice Search"
        placement={"bottom"}
        closable={false}
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
          {recording ? (
            <>
              <p>Try saying something....</p>
              <Spin size="small" />
            </>
          ) : (
            <p className={` ${searchValue ? "search-result" : ""}`}>
              {searchValue}
            </p>
          )}
        </div>
      </Drawer>
    </div>
  );
}
