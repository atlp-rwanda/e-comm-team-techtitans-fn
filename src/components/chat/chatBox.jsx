// import { useDispatch, useSelector } from "react-redux";
// import { setChatIdchatingUser } from "../../Redux/Features/chat/chatingUserSlice";
// import { createUserChat } from "../../Redux/Features/chat/messagesSlice";
// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import { myMessages } from "../../Redux/Features/chat/messagesSlice";
// import { userToChat } from "../../Redux/Features/chat/chatSlice";
// import { users } from "../../Redux/Features/chat/allUsersSlice";
// import { allMyChats } from "../../Redux/Features/chat/allUsersSlice";

// let ChatBox = ({ chatId, names, message }) => {
//   const dispatch = useDispatch();
//   let [isSelected, setIsSelected] = useState(false);
//   const allChats = useSelector((state) => state.allUserToChat?.allChats?.data);

//   const handleClick = () => {
//     // setIsSelected(!isSelected);
//     if (findChatId(allChats, `${chatId}`)) {
//       dispatch(setChatIdchatingUser(chatId));
//       dispatch(myMessages(chatId));
//     } else {
//       dispatch(setChatIdchatingUser(chatId));
//       dispatch(createUserChat(chatId));
//     }
//   };

//   let findChatId = (myArray, targetItem) => {
//     return myArray.some((data) => {
//       if (data.id) {
//         return data.id === targetItem;
//       }
//       return false;
//     });
//   };

//   useEffect(() => {
//     const socket = io("http://localhost:3001/");

//     socket.emit("join_room", chatId);

//     socket.on("receive_message", (data) => {
//       // Handle the received message
//       dispatch(myMessages(data.chatId));
//       console.log("Received message:", data);
//     });
//     dispatch(userToChat());
//     dispatch(users());
//     dispatch(allMyChats());
//     return () => {
//       socket.disconnect();
//     };
//   }, [chatId, isSelected, dispatch]);

//   return (
//     <>
//       <div className="chatBox" onClick={handleClick}>
//         <div className={`chatCont ${isSelected ? "selected" : ""}`}>
//           <div className="chatImg">
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3xM2vjVkOGoeb34L7o1BU93Nmi0zAz6BvDw&usqp=CAU"
//               className="image1"
//             />
//           </div>
//           <div className="chatName">
//             <div className="chatUserName">
//               <h2>{names}</h2>
//             </div>
//             <div className="chatUserMessage">
//               {message.length > 10 ? (
//                 <p>{message.slice(0, 25)}....</p>
//               ) : (
//                 <p>{message}</p>
//               )}
//             </div>
//           </div>
//           <div className="chatStatus">
//             <div className="chatDates">12:00</div>
//             <div className="chatMissed">2</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChatBox;

// import { useDispatch, useSelector } from "react-redux";
// import { setChatIdchatingUser } from "../../Redux/Features/chat/chatingUserSlice";
// import { createUserChat } from "../../Redux/Features/chat/messagesSlice";
// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import { myMessages } from "../../Redux/Features/chat/messagesSlice";
// import { userToChat } from "../../Redux/Features/chat/chatSlice";
// import { allMyChats } from "../../Redux/Features/chat/allUsersSlice";

// const ChatBox = ({ chatId, names, message }) => {
//   const dispatch = useDispatch();
//   const allChats = useSelector((state) => state.allUserToChat?.allChats?.data);
//   const [isSelected, setIsSelected] = useState(false);

//   const handleClick = () => {
//     if (findChatId(allChats, chatId)) {
//       dispatch(setChatIdchatingUser(chatId));
//       // dispatch(myMessages(chatId));
//     } else {
//       dispatch(setChatIdchatingUser(chatId));
//       dispatch(createUserChat(chatId));
//     }
//   };

//   const findChatId = (myArray, targetItem) => {
//     return myArray.some((data) => data.id === targetItem);
//   };

//   useEffect(() => {
//     const socket = io("http://localhost:3001/");

//     socket.emit("join_room", chatId);

//     socket.on("receive_message", (data) => {
//       dispatch(myMessages(data.chatId));
//       console.log("Received message:", data);
//     });

//     dispatch(userToChat());
//     dispatch(allMyChats());

//     return () => {
//       socket.disconnect();
//     };
//   }, [chatId, dispatch]);

//   return (
//     <div className="chatBox" onClick={handleClick}>
//       <div className={`chatCont ${isSelected ? "selected" : ""}`}>
//         <div className="chatImg">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3xM2vjVkOGoeb34L7o1BU93Nmi0zAz6BvDw&usqp=CAU"
//             alt="User Avatar"
//             className="image1"
//           />
//         </div>
//         <div className="chatName">
//           <div className="chatUserName">
//             <h2>{names}</h2>
//           </div>
//           <div className="chatUserMessage">
//             {message.length > 10 ? (
//               <p>{message.slice(0, 25)}....</p>
//             ) : (
//               <p>{message}</p>
//             )}
//           </div>
//         </div>
//         <div className="chatStatus">
//           <div className="chatDates">12:00</div>
//           <div className="chatMissed">2</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

import { useDispatch, useSelector } from "react-redux";
import { setChatIdchatingUser } from "../../Redux/Features/chat/chatingUserSlice";
import { createUserChat } from "../../Redux/Features/chat/messagesSlice";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { myMessages } from "../../Redux/Features/chat/messagesSlice";
import { userToChat } from "../../Redux/Features/chat/chatSlice";
import { allMyChats } from "../../Redux/Features/chat/allUsersSlice";

const ChatBox = ({ chatId, names, message }) => {
  const dispatch = useDispatch();
  const allChats = useSelector((state) => state.allUserToChat?.allChats?.data);
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (findChatId(allChats, chatId)) {
      dispatch(myMessages(foundChatId(allChats, chatId)));
      console.log("this is found chat..............................", findChatId(allChats, chatId));
      dispatch(setChatIdchatingUser(chatId));
    } else {
      alert("chat not found");
      // dispatch(setChatIdchatingUser(chatId));
      dispatch(createUserChat(chatId));
    }
  };

  const findChatId = (myArray, targetItem) => {
    return myArray.some((data) => data.id === targetItem);
  };

  const foundChatId = (myArray, targetItem) => {
    const foundChat = myArray.find((data) => data.id === targetItem);
    return foundChat ? foundChat.id : null;
  };

  useEffect(() => {
    const socket = io("http://localhost:3001/");

    socket.emit("join_room", chatId);

    socket.on("receive_message", (data) => {
      console.log("alll....................", findChatId(allChats, chatId));
      dispatch(myMessages(foundChatId(allChats, chatId)));
      console.log("Received message:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatId, allChats]);

  useEffect(() => {
    dispatch(userToChat());
    dispatch(allMyChats());
  }, []);

  return (
    <div className="chatBox" onClick={handleClick}>
      <div className={`chatCont ${isSelected ? "selected" : ""}`}>
        <div className="chatImg">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3xM2vjVkOGoeb34L7o1BU93Nmi0zAz6BvDw&usqp=CAU"
            alt="User Avatar"
            className="image1"
          />
        </div>
        <div className="chatName">
          <div className="chatUserName">
            <h2>{names}</h2>
          </div>
          <div className="chatUserMessage">
            {message.length > 10 ? (
              <p>{message.slice(0, 25)}....</p>
            ) : (
              <p>{message}</p>
            )}
          </div>
        </div>
        <div className="chatStatus">
          <div className="chatDates">12:00</div>
          <div className="chatMissed">2</div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
