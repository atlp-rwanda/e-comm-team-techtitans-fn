import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { useNavigate } from "react-router-dom";
import "./toast.scss";

function Toast() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher("05ec752bb61eabaa3bae", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (data) {
      const vendor = JSON.parse(localStorage.getItem("userIn"));
      const { email } = vendor;
      const recipient = email;
      console.log("This is the recipient", recipient);

      if (data.recipient === recipient) {
        console.log("This is the data", data.message);
        setToastMessage(data.message);
        setShowToast(true);
      }
    });

    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 9000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleButtonClick = () => {
    navigate("/dashboard/notification");
  };
  console.log("toast message", toastMessage);
  const renderMessage = () => {
    const parts = toastMessage.split("<strong>");

    return parts.map((part, index) => {
      if (index === 0) {
        return part;
      }

      const strongEndIndex = part.indexOf("</strong>");

      if (strongEndIndex !== -1) {
        const strongPart = part.slice(0, strongEndIndex);
        const remainingPart = part.slice(strongEndIndex + 9);

        return (
          <React.Fragment key={index}>
            <strong>{strongPart}</strong>
            {remainingPart}
          </React.Fragment>
        );
      }

      return part;
    });
  };
  return (
    <div className={`toast ${showToast ? "show" : ""}`}>
      <div className="toast-container">
        <div className="icon">
          <i className="bx bx-bell"></i>
        </div>
        <div className="message">{renderMessage()}</div>
      </div>
      <button className="link-button" onClick={handleButtonClick}>
        View Notification
      </button>
    </div>
  );
}

export default Toast;
