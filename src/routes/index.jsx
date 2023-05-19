
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/index";
import Shop from "../pages/Shop/Shop.jsx";
import VerifyOtp from "../pages/VerifyOtp/VerifyOtp";

let allRoutes = () => { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
       </Routes>
     </BrowserRouter>

  );
};

export default allRoutes;