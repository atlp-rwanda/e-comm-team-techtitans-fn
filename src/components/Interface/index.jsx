import React from "react";
import NavBar from "./NavMenu/NavBar";
import Content from "./Content/Content";
import "./interface.scss";
function Menu() {
  return (
    <div className="interface" id="interface">
      <NavBar />
      <Content />
    </div>
  );
}

export default Menu;
