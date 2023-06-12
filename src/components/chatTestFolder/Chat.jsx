// import React, { useEffect, useState } from "react";

// function Chat({ room }) {
//   // function Chat({ socket, room }) {
//   let [message, setMessage] = useState("");

//   const messToSend = {
//     room,
//     message,
//   };

//   let handleChange = (e) => {
//     setMessage(e.target.value);
//   };
//   let handleClick = async () => {
//     // await socket.emit("send_message", { messToSend });
//     // console.log("message", message);
//   };
//   // useEffect(() => {
//   //   socket.on("receive_message", (data) => {
//   //     console.log("received message:", data);
//   //     // Dispatch an action or update the component state with the received message
//   //   });
//   //   // Clean up the socket listener when the component unmounts
//   //   return () => {
//   //     socket.off("receive_message");
//   //   };
//   // }, [socket]);

//   return (
//     <div>
//       {/* <h2>live chat</h2>
//       <input
//         type="text"
//         placeholder="enter message"
//         value={message}
//         onChange={handleChange}
//       />
//       <button onClick={handleClick}>Send</button> */}
//     </div>
//   );
// }

// export default Chat;
