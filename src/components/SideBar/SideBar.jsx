import { Link } from "react-router-dom";
import { useState } from "react";
import "./sideBar.scss";
import Logo from "../../assets/Logo/Logo.svg";

function SideBar() {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <section className="menu" id="menu">
      <div className="logo">
        <img src={Logo} />
      </div>
      <div className="items">
        <li className={activeItem === "dashboard" ? "active" : ""}>
          <i className="bx bxs-dashboard"></i>
          <Link to="/dashboard" onClick={() => setActiveItem("dashboard")}>
            Dashboard
          </Link>
        </li>
        <li className={activeItem === "users" ? "active" : ""}>
          <i className="bx bx-user"></i>
          <Link to="/listusers" onClick={() => setActiveItem("users")}>
            Users
          </Link>
        </li>
        <li className={activeItem === "products" ? "active" : ""}>
          <i className="bx bx-layout"></i>
          <Link
            to="/dashboard/productsList"
            onClick={() => setActiveItem("products")}
          >
            Products
          </Link>
        </li>
        <li className={activeItem === "orders" ? "active" : ""}>
          <i className="bx bx-wallet"></i>
          <Link to="/users" onClick={() => setActiveItem("orders")}>
            Orders
          </Link>
        </li>
        <li className={activeItem === "chats" ? "active" : ""}>
          <i className="bx bx-comment-dots"></i>
          <Link to="/users" onClick={() => setActiveItem("chats")}>
            Chats
          </Link>
        </li>

        <hr />

        <li>
          <i className="bx bx-cog"></i>
          <Link to="/products">Settings</Link>
        </li>
        <li>
          <i className="bx bx-help-circle"></i>
          <Link to="/users">Help Center</Link>
        </li>
      </div>
    </section>
  );
}

export default SideBar;
