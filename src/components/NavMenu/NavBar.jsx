import Notification from "../Notification/Notification";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProfile } from "../../Redux/Features/Profile/getprofile.slice";
import Pusher from "pusher-js";

function NavBar() {
  const { getprofile } = useSelector((state) => state.getprofile);
  const [notification, setNotification] = useState(false);
  const { getnotification, status, error } = useSelector(
    (state) => state.getnotification
  );

  if (getnotification && status === "succeeded") {
    var count = getnotification.data.notifications.length;
  } else {
    count = 0;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetProfile());
  }, [dispatch]);
  // console.log("This is the profile", getprofile);
  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map((name) => {
      if (name.length > 0) {
        return name[0].toUpperCase();
      }
    });
    return initials.join('');
  }
  if (!getprofile) {
    return null;
  }
  const { fullname, image } = getprofile;

  return (
    <div className="navigation">
      <div className="n1">
        <div>
          <i className="bx bx-menu" id="menu-btn"></i>
        </div>
      </div>
      <div className="profile">
        <div className="search">
          <i className="bx bx-search"></i>
        </div>
        <div className="notificatiom">
          <Link to="/dashboard/notification" className="not-link">
            <div className="notificatiom notification">
              <div className="notification-number">
                <p>{count}</p>
              </div>
              <CircleNotificationsIcon />
              {notification && <Notification />}
            </div>
          </Link>
        </div>
        <div className="vl"></div>
        <div className="image-initials">
          {image ? (
            <img src={image} alt="Profile" />
          ) : (
            <div className="initials-name">
              <div className="initials">{getInitials(fullname)}</div>
            </div>
          )}
        </div>
        <div className="name">
          <Link to="/dashboardprofile">
            <h3 id="currentLogin">{fullname}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
