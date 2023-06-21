import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../Header/header.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetNotification } from "../../Redux/Features/Notification/NotificationSlice";
import ReadNotification from "./readNotification";

const Notification = ({ id }) => {
  const { getnotification, status, error } = useSelector(
    (state) => state.getnotification
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetNotification());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items to display per page

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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

  if (
    !getnotification ||
    !getnotification.data ||
    !getnotification.data.notifications
  ) {
    return null; // Return null or a loading state while waiting for the data
  }

  // Calculate the indices for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getnotification.data.notifications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    getnotification.data.notifications.length / itemsPerPage
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {status === "succeeded" && (
        <div className="notificationDisplay">
          {currentItems.map((notification) => (
            <div key={notification.id} className="notificationAll">
              <div className="">
                <h3>{notification.subject}</h3>
                <p className="stat">
                  Status:&nbsp;&nbsp;
                  <span
                    className="notStatus"
                    style={
                      notification.notificationStatus === "read"
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    {notification.notificationStatus}
                  </span>{" "}
                </p>

                <Link
                  to={`/dashboard/notification/${notification.id}`}
                  key={notification.id}
                  className="notificationStatus"
                >
                  <span>Read Notification</span>
                </Link>
              </div>
            </div>
          ))}

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={pageNumber === currentPage ? "active" : ""}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
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
