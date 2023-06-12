import { Link } from "react-router-dom";
import { useState } from "react";
import "./sideBar.scss";
import Logo from "../../assets/Logo/Logo.svg";
import { logout } from "../../Redux/Features/User/logoutSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const userRole = localStorage.getItem("role"); // Get user role from localStorage
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className="menu" id="menu">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="items">
        <li className={activeItem === "dashboard" ? "active" : ""}>
          <i className="bx bxs-dashboard"></i>
          <Link to="/dashboard" onClick={() => setActiveItem("dashboard")}>
            Dashboard
          </Link>
        </li>
        {userRole === "1" || userRole === 1 ? (
          <li className={activeItem === "users" ? "active" : ""}>
            <i className="bx bx-user"></i>
            <Link to="/listusers" onClick={() => setActiveItem("users")}>
              Users
            </Link>
          </li>
        ) : null}
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
          <Link to="/listorders" onClick={() => setActiveItem("orders")}>
            Orders
          </Link>
        </li>
        <li className={activeItem === "chats" ? "active" : ""}>
          <i className="bx bx-comment-dots"></i>
          <Link to="/chat" onClick={() => setActiveItem("chats")}>
            Chats
          </Link>
        </li>

        <hr />

        <li>
          <i className="bx bx-cog"></i>
          <Link to="/products">Settings</Link>
        </li>
        <li
          onClick={async () => {
            await dispatch(logout()).unwrap();
            navigate("/auth/login");
          }}
        >
          <i class='bx bx-log-out'></i>
          Logout
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
