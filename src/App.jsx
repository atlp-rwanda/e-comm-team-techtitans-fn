import { useState } from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Routes from "./routes/index.jsx";

function App() {
  // const socket = io.connect("http://localhost:3001/");
  // useEffect(() => {
  //   console.log("i am reloaded");
  //   const socket = io("http://localhost:3001/");

  //   socket.on("connect", () => {
  //     console.log("connected to a server");
  //   });
  //   socket.on("disconnected", () => {
  //     console.log("disconnected from the server");
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  return (
    <>
      <div>
      <Router><Routes></Routes></Router>
      </div>
    </>
  );
}

export default App;
