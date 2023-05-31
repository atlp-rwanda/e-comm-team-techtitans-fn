import { useState, useEffect } from "react";

export default function ChatActive({ socket }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);
  return (
    <>
      <div className="active-chats">
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID} id="names" className="flex">
              {" "}
              {user.userName} <span id="chat-active"></span>
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
