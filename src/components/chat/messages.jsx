import MyMessage from "./messages/myMessage";
import ChatMessage from "./messages/chatMessage";
import SendMessage from "./messages/sendMessage";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { myMessages } from "../../Redux/Features/chat/messagesSlice";
import { users } from "../../Redux/Features/chat/allUsersSlice";

let Messages = () => {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("chatingUser"));
  const allOneOnOne = useSelector((state) => state.myMessages?.data?.data);
  const chatId = useSelector((state) => state.chatingUser?.chatId);

  useEffect(() => {
    dispatch(myMessages(chatId));
    dispatch(users());
  }, [dispatch, chatId]);
  return (
    <>
      <div className="messages-cont">
        <div className="messages">
          <div className="holdNames">
            {allOneOnOne &&
              allOneOnOne.map((items, index) => (
                <>
                  {items.senderId != userId.id ? (
                    <ChatMessage key={index} message={items.content} />
                  ) : (
                    <MyMessage key={index} message={items.content} />
                  )}
                </>
              ))}
          </div>
          <SendMessage />
        </div>
      </div>
    </>
  );
};

export default Messages;
