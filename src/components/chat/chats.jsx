import ChatList from './chatsList';
import { useState } from 'react';

let Chats = () => {
  let [search, setSearch] = useState("");

  let handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="chatCont">
        <div className="chats">
          <div className="searchBtn">
            <div className="searchFlex">
              <img
                src="https://res.cloudinary.com/dkomkrwe2/image/upload/v1685526669/MagnifyingGlass_vz9ejf.png"
                className="searchImg"
              />
              <input
                type="text"
                className="searchInput"
                value={search}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="allChats">
            <ChatList search={search} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
