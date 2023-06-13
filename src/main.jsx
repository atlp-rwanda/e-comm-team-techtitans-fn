import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store/index.js";
import "./index.css";
import "./main.scss";
import { ThemeProvider } from "./components/Theme/ThemeContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  </ThemeProvider>
);
