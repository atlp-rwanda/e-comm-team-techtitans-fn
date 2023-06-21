import React, { useContext } from "react";
import { FiBell } from "react-icons/fi";
import { Link } from "react-router-dom";
import { NotificationContext } from "./NotificationToast";

const Navbar = () => {
  const { notificationCount, resetNotificationCount } =
    useContext(NotificationContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/notifications">
        <FiBell onClick={resetNotificationCount} />
        {notificationCount > 0 && <span>{notificationCount}</span>}
      </Link>
    </nav>
  );
};

export default Navbar;
