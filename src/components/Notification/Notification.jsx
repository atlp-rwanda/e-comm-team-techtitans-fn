import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../Header/header.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetNotification } from "../../Redux/Features/Notification/NotificationSlice";

const Notification = () => {
  const { getnotification, status, error } = useSelector(
    (state) => state.getnotification
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetNotification());
  }, [dispatch])
  // .then((response) => {
  //   console.log('tis is paylod', response?.payload)

  // }).catch((error)=>
  //   console.log(error)
  // )
  console.log("This is the notification", getnotification);
  if (status === "failed") {
    return (
      <div className="notificationDisplay">
        <div className="notificationN">
          <div className="notificationN-content">
            <h3>you don't have any notification at the moment</h3>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {status === 'succeeded' && (
        <div className="notificationDisplay">

          {getnotification.data.notifications.map((notification) => (
            <div key={notification.id} className="notificationN">
              <div className="notificationN-content">
                <h3>{notification.subject}</h3>
                <p>{notification.body}</p>
              </div>


            </div>
          ))}
        </div>
      )}
      {/* {status === "failed" && (
        <div>
          error
        </div>
      )} */}
    </div>
  );
};
export default Notification;
