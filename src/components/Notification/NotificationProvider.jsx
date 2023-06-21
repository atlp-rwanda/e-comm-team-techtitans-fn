import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./NavToast";
import Home from "./Home";
import Notifications from "./Notifications";
import { NotificationProvider } from "./NotificationToast";

const App = () => {
  return (
    <Router>
      <NotificationProvider>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/notifications" component={Notifications} />
        </Switch>
      </NotificationProvider>
    </Router>
  );
};

export default App;
