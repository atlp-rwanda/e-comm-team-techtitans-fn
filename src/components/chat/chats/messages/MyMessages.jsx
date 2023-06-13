import React from "react";

export default function MyMessages({ message, time }) {
  return (
    <div className="all-group-myMessage">
      <div className="group-myMessage">{message}</div>
      <p className="myhour" >{time}</p>
    </div>
  );
}
