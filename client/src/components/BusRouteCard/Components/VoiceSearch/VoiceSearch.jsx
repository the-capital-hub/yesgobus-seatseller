import { useEffect, useState } from "react";
// import MicImage from "../../../../assets/busbooking/micImg.svg";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import { Button, Drawer, Spin } from "antd";
import "./VoiceSearch.scss";
import { LuMic } from "react-icons/lu";

export default function VoiceSearch({
  setLocationQuery,
  setInputValue,
  setData,
  title,
}) {
  // const [recording, setRecording] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [placeholder, setPlaceholder] = useState("Try saying something....");
  const [isTimedout, setIsTimedout] = useState(false);

  useEffect(() => {
    async function getPermission() {
      const available = await SpeechRecognition.available();
      if (!available) {
        SpeechRecognition.requestPermissions();
      }
    }

    getPermission();
  }, []);

  // Timeout useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchValue && open) {
        handleTimeout();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [searchValue, handleTimeout, open]);

  async function startRecording() {
    const checkPermissions = await SpeechRecognition.checkPermissions();
    if (checkPermissions.speechRecognition !== "granted") {
      await SpeechRecognition.requestPermissions();
    } else {
      setOpen(true);
    }
    const available = await SpeechRecognition.available();
    if (available) {
      // setRecording(true);
      setIsTimedout(false);
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
    setOpen(false);
    setPlaceholder("Try saying something...");
    setSearchValue("");
    setIsTimedout(false);
    // setRecording(false);

    if (cancelled) {
      return;
    }

    // Send value to input
    if (searchValue) {
      setInputValue(searchValue);
      setLocationQuery(searchValue);
      setData(searchValue);
    }
  }

  //   Handle mic click
  function handleMicClick() {
    startRecording();
  }

  // Handle No Click
  function handleNoClick() {
    startRecording();
    setSearchValue("");
    setPlaceholder("Try again...");
  }

  // Handle close
  function onClose() {
    stopRecording(true);
  }

  // handle Timeout
  function handleTimeout() {
    SpeechRecognition.stop();
    SpeechRecognition.removeAllListeners();
    setIsTimedout(true);
    setSearchValue("");
    setPlaceholder("Didn't catch that. Try again.");
  }

  return (
    <div className="voice-search-wrapper">
      <button type="button" className="modal-trigger" onClick={handleMicClick}>
        {/* <img src={MicImage} width="30" height="30" /> */}
        <LuMic size={30} color="white" />
      </button>
      <Drawer
        title={`Search ${title === "From" ? "Departure" : "Destination"}`}
        placement={"bottom"}
        closable={false}
        onClose={onClose}
        open={open}
        key={"bottom"}
        height={"250px"}
        classNames={{ body: "drawer-body" }}
      >
        <div className="drawer-content">
          <div
            className="modal-mic"
            style={{
              boxShadow: `${
                searchValue
                  ? ""
                  : isTimedout
                  ? "0px 0px 5px 5px #33333355"
                  : "0px 0px 5px 5px #fd5901"
              }`,
            }}
          >
            {/* <img src={MicImage} width="30" height="30" /> */}
            <LuMic
              size={30}
              color={`${
                searchValue ? "#fd5901" : isTimedout ? "gray" : "white"
              }`}
            />
          </div>
          {!searchValue ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <p style={{ fontSize: "1.25rem" }}>{placeholder}</p>
              {!isTimedout && <Spin size="small" />}
            </div>
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
          {!isTimedout ? (
            searchValue && (
              <>
                <Button
                  type="primary"
                  onClick={() => stopRecording()}
                  size="middle"
                  htmlType="button"
                  style={{ paddingInline: "2rem" }}
                >
                  Yes
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleNoClick()}
                  size="middle"
                  htmlType="button"
                  style={{ paddingInline: "2rem" }}
                >
                  No
                </Button>
              </>
            )
          ) : (
            <Button
              type="primary"
              onClick={() => handleNoClick()}
              size="middle"
              htmlType="button"
              style={{ paddingInline: "2rem" }}
            >
              Retry
            </Button>
          )}
        </div>
      </Drawer>
    </div>
  );
}
