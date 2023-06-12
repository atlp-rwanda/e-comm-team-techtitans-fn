import Messages from "../../components/chat/messages";
import Chats from "../../components/chat/chats";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavMenu/NavBar";
import "../../styles/chat.scss";

let Chat = () => {
  return (
    <>
      <div className="interface" id="interface">
        <NavBar />
        <SideBar />
        <div className="chat-main-cont">
          <div className="chatContainer">
            <div className="chatMessageCont">
              <Chats />
              <Messages />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
