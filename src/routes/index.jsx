import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "../pages/Categories/Categories.jsx";
import Home from "../pages/Home/index";
import Shop from "../pages/Shop/Shop.jsx";
import ListUser from "../pages/ListofUser";
import LoginForm from "../pages/Login/Login.jsx";
import VerifyOtp from "../pages/Login/verifyOtp.jsx";
import Dashboard from "../pages/Dashboard/index.jsx";
let allRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listusers" element={<ListUser />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/OTPForm" element={<VerifyOtp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default allRoutes;
