import { Link } from "react-router-dom";
import "./sideBar.scss";
import Logo from "../../assets/Logo/Logo.svg";

function SideBar() {
  return (
    <section className="menu" id="menu">
      <div className="logo">
        <img src={Logo} />
      </div>
      <div className="items">
        <li>
          <i className="bx bxs-dashboard"></i> <Link to="/home">Dashboard</Link>
        </li>
        <li>
          <i className="bx bx-user"></i>
          <Link to="/user">Users</Link>
        </li>
        <li>
          <i className="bx bx-layout"></i>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <i className="bx bx-wallet"></i>
          <Link to="/users">Orders</Link>
        </li>
        <li>
          <i className="bx bx-comment-dots"></i>
          <Link to="/users">Chats</Link>
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
