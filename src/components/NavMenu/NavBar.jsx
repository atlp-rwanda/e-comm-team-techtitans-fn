import Profile from "../../assets/images/profile.jpeg";
import Notification from "../Notification/Notification";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetNotification } from "../../Redux/Features/Notification/NotificationSlice";
function NavBar() {
  const [notification, setNotification] = useState(false);
  const { getnotification, status, error } = useSelector((state) => state.getnotification);

  console.log("This is the notification", getnotification)
  if (getnotification && status === "succeeded") {
    var count = getnotification.data.notifications.length;
  } else {
    count = 0;
  }
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
          <Link to="/dashboard/notification">
            <div className='notificatiom notification'  >
              <div className='notification-number' >

                <p>{count}</p>


              </div>
              <CircleNotificationsIcon />
              {notification && <Notification />}
            </div>
          </Link>
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
