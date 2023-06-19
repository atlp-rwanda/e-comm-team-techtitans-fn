import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../../styles/aboutPages.scss";

function Navbar() {
  return (
    <nav className="nav-menu active">
      <ul className="nav-menu-items">
        {SidebarData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {/* {item.icon} */}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;

