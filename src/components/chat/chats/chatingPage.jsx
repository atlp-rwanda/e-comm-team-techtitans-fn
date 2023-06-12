import Header from "../../Header/Header";
import { useEffect } from "react";
// import Header from "../../Header/Header";
import ChatSideBar from "./components/chatSideBar";
import ChatActive from "./components/chatActive";
import ChatMessage from "./components/ChatMessage";
import "../../../styles/groupChat.scss";

function ChatingPage({ socket }) {
  let backgroundUrl =
    "https://images.pexels.com/photos/6120215/pexels-photo-6120215.jpeg?auto=compress&cs=tinysrgb&w=800";

  const styleBack = {
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const bell = "";

  return (
    <>
      <div className="group-chat-cont">
        <Header />
        <div className="group-chat-mainCont">
          <div className="chat-search-con">
            <h1>Tech-Titans channel</h1>
            {/* <input type="text" className="chat-header-input" /> */}
          </div>
          <div className="group-chat-subCont">
            <div className="group-side-bar">
              <ChatSideBar />
            </div>
            <div className="group-users">
              <ChatActive socket={socket} />
            </div>
            <div className="group-messages" style={styleBack}>
              <ChatMessage socket={socket} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatingPage;
