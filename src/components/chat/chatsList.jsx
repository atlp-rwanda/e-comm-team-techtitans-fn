// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ChatBox from "./chatBox";
// import { chat, userToChat } from "../../Redux/Features/chat/chatSlice";
// import { myMessages } from "../../Redux/Features/chat/messagesSlice";
// import { users } from "../../Redux/Features/chat/allUsersSlice";
// import { allMyChats } from "../../Redux/Features/chat/allUsersSlice";

// // eslint-disable-next-line react/prop-types
// let ChatList = ({ search }) => {
//   let chatId = (chatingId) => {
//     console.log("the id is:", chatingId);
//     // dispatch(myMessages(chatingId));
//   };

//   let getOneName = (name) => {
//     return name.split(" ")[0];
//   };

//   let getName = (inputName) => {
//     const name = inputName.split(" & ")[1];
//     return getOneName(name);
//   };
//   const allPeopleToChat = useSelector((state) => state.chat?.userToChat?.data);
//   const allMyUsers = useSelector(
//     (state) => state.allUserToChat?.allUsers?.data.rows
//   );
//   let allPeopleArray = [];

//   if (Array.isArray(allPeopleToChat) && Array.isArray(allMyUsers))
//     allPeopleArray = [...allPeopleToChat, ...allMyUsers];
//   const lastmessage = useSelector((state) => state);
//   console.log("these are them:", lastmessage);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(userToChat());
//     dispatch(users());
//     dispatch(allMyChats());
//     // dispatch(myMessages(chatId));
//   }, [dispatch]);
//   const searchedChats = allPeopleArray?.filter((items) => {
//     // eslint-disable-next-line react/prop-types
//     return items.chatName
//       ? items.chatName.toLowerCase().includes(search.toLowerCase())
//       : items.fullname.toLowerCase().includes(search.toLowerCase());
//   });
//   console.log("alllllllll   people", searchedChats);
//   return (
//     <>
//       {searchedChats &&
//         searchedChats.map((data) => (
//           <ChatBox
//             key={data.id}
//             chatId={data.id}
//             names={
//               data.chatName ? getName(data.chatName) : getOneName(data.fullname)
//             }
//             message={chatId(data.id) || ""}
//             hour={data.message ? data.updatedAt : ""}
//           />
//         ))}
//     </>
//   );
// };

// export default ChatList;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatBox from "./chatBox";
import { chat, userToChat } from "../../Redux/Features/chat/chatSlice";
import { myMessages } from "../../Redux/Features/chat/messagesSlice";
import { users } from "../../Redux/Features/chat/allUsersSlice";
import { allMyChats } from "../../Redux/Features/chat/allUsersSlice";

// eslint-disable-next-line react/prop-types
let ChatList = ({ search }) => {
  let chatId = (chatingId) => {
    console.log("the id is:", chatingId);
    // dispatch(myMessages(chatingId));
  };

  let getOneName = (name) => {
    return name.split(" ")[0];
  };

  let getName = (inputName) => {
    const name = inputName.split(" & ")[1];
    return getOneName(name);
  };
  const allPeopleToChat = useSelector((state) => state.chat?.userToChat?.data);
  const allMyUsers = useSelector(
    (state) => state.allUserToChat?.allUsers?.data.rows
  );
  let allPeopleArray = [];

  if (Array.isArray(allPeopleToChat) && Array.isArray(allMyUsers)) {
    allPeopleArray = [...allPeopleToChat, ...allMyUsers];
    allPeopleArray = Array.from(new Set(allPeopleArray.map(JSON.stringify))).map(JSON.parse);
  }

  const lastmessage = useSelector((state) => state);
  console.log("these are them:", lastmessage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userToChat());
    dispatch(users());
    dispatch(allMyChats());
    // dispatch(myMessages(chatId));
  }, [dispatch]);
  const searchedChats = allPeopleArray?.filter((items) => {
    // eslint-disable-next-line react/prop-types
    return items.chatName
      ? items.chatName.toLowerCase().includes(search.toLowerCase())
      : items.fullname.toLowerCase().includes(search.toLowerCase());
  });
  console.log("alllllllll   people", searchedChats);
  return (
    <>
      {searchedChats &&
        searchedChats.map((data) => (
          <ChatBox
            key={data.id}
            chatId={data.id}
            names={
              data.chatName ? getName(data.chatName) : getOneName(data.fullname)
            }
            message={chatId(data.id) || ""}
            hour={data.message ? data.updatedAt : ""}
          />
        ))}
    </>
  );
};

export default ChatList;
