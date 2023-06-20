import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allMessage } from "../../../../Redux/Features/chat/allmessagesSlice";

export default function ChatSendMessage({ socket }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const [message, setMessage] = useState("");
  let userIn = JSON.parse(localStorage.getItem("userIn")) || {};
  const myName = userIn.fullname;
  const date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: userIn.fullname,
        time: { hour, min },
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    const payload = { message, myName };
    dispatch(allMessage(payload));
    console.log(message, userIn.fullname);
    setMessage("");
  };
  return (
    <>
      <form className="chatfooter" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="write a message.."
          className="groupsendInput"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <img
          className="groupsendIcon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwCDjrGZTba_aPiLR6_2UcxvBao8SyLPOTUw&usqp=CAU"
          onClick={handleSendMessage}
          type="submit"
        />
      </form>
    </>
  );
}
