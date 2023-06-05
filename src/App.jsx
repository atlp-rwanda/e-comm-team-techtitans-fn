import { useState } from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./routes/index.jsx";

function App() {
  return (
    <>
      <div>
      <Router><Routes></Routes></Router>
      </div>
    </>
  );
}

export default App;
