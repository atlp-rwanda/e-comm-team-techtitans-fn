import React from "react";
import Profile from "../../../assets/images/profile.jpeg";
function NavBar() {
  return (
    <div className="navigation">
      {/* 1 */}
      <div className="n1">
        <div>
          <i className="bx bx-menu" id="menu-btn"></i>
        </div>
      </div>
      {/* 2 */}
      <div className="profile">
        {/* 3 */}
        <div className="search">
          <i className="bx bx-search"></i>
        </div>
        <div className="notificatiom">
          <i className="bx bx-bell"></i>
        </div>
        <div className="vl"></div>
        <img src={Profile} alt="" />
        <div className="name">
          <h3 id="currentLogin">Tristan</h3>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
