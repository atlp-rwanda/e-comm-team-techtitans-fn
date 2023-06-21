import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  const incrementNotificationCount = () => {
    setNotificationCount((prevCount) => prevCount + 1);
  };

  const resetNotificationCount = () => {
    setNotificationCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        notificationCount,
        incrementNotificationCount,
        resetNotificationCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
